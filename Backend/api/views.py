from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.timezone import localtime
from datetime import datetime, timedelta, date
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import logout 
from rest_framework.views import APIView
from django.utils.dateparse import parse_date, parse_time
import json , hashlib
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Usuario, Prestador, Consultas_Agendadas, Horario_Prestadores, Recordatorio
from .serializers import UsuarioSerializador, ConsultaAgendadaSerializer, HorarioPrestadorSerializer
from .utils import obtener_tokens_para_usuario
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from django.utils import timezone


from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.shortcuts import get_object_or_404
from .utils import account_recovery_token
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from django.shortcuts import render, redirect
from django.utils.timezone import now
from django.db.models import Q
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required




"""
    ---------------registro----------            
        Fnombre = datos.get('Fnombre')
        Snombre = datos.get('Snombre')
        Fapellido = datos.get('Fapellido')
        Sapellido = datos.get('Sapellido') 
        
        
        if rut and Fnombre and Fapellido:
        
        validUser = Usuario(rut=rut, Fnombre=Fnombre, Snombre=Snombre, Fapellido=Fapellido, Sapellido=Sapellido, contrasena=contrasena, contacto=contacto, calle=calle, num_casa=num_casa, num_apar=num_apar, id_centro=id_centro)
"""

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)  # Cerrar sesión
        return JsonResponse({'message': 'Cierre de sesión exitoso'}, status=200)


# Decorador para verificar si el usuario tiene permiso para ver datos sensibles
def has_permission_to_view_sensitive_data(user):
    return user.has_perm('api.can_view_sensitive_data')  # Cambia 'api' por el nombre de tu aplicación

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def vista_protegida(request):
    return JsonResponse({'message': 'Acceso permitido porque el token es válido.'}, status=200)

@csrf_exempt
def registro(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        
        serializer = UsuarioSerializador(data=datos)

        if serializer.is_valid():
            # Verificar si el RUT ya existe
            if Usuario.objects.filter(rut=serializer.validated_data['rut']).exists():
                return JsonResponse({'error': 'El rut ya existe'}, status=400)
            
            # Crear y guardar el nuevo usuario
            serializer.save()  # Llama a la función create del serializer

            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
        
        return JsonResponse({'error': serializer.errors}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('Rut')  # Autenticación basada en el rut
        contrasena = datos.get('Contraseña')
        
        try:
            usuario = Usuario.objects.get(rut=rut)

            # Verificar la contraseña
            if check_password(contrasena, usuario.password):
                # Actualizar session_start al momento del inicio de sesión
                usuario.session_start = now()  # Establecer la hora de inicio de sesión
                usuario.save()  # Guardar los cambios en el usuario

                # Generar tokens para el usuario
                tokens = obtener_tokens_para_usuario(usuario)
                return JsonResponse({
                    'message': 'Inicio de sesión exitoso',
                    'refresh': tokens['refresh'],
                    'access': tokens['access']
                }, status=200)
            else:
                return JsonResponse({'error': 'Credenciales inválidas'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)  # Cerrar sesión
        return JsonResponse({'message': 'Cierre de sesión exitoso'}, status=200)


from django.conf import settings

# ---------------------recuperar contraseña-------------------------------------------
User = get_user_model()  # Tu modelo Usuario

@method_decorator(csrf_exempt, name='dispatch')
class PasswordResetRequestView(View):
    def post(self, request):
        data = json.loads(request.body)
        rut = data.get('rut')  # Obtenemos el RUT enviado en el cuerpo de la solicitud

        # Buscar usuario por RUT
        try:
            user = User.objects.get(rut=rut)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        # Validar que el usuario tenga un email registrado
        if not user.email:
            return JsonResponse({'error': 'El usuario no tiene un correo electrónico registrado'}, status=400)

        # Generar token y enlace de restablecimiento
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        
        # El enlace de restablecimiento
        reset_link = f"{request.scheme}://{request.get_host()}/password-reset/{uidb64}/{token}/"

        # Enviar correo
        try:
            send_mail(
                subject="Recuperación de contraseña",
                message=f"Hola, haz clic en el siguiente enlace para restablecer tu contraseña: {reset_link}",
                from_email=settings.EMAIL_HOST_USER,  # Correo de la cuenta de envío desde settings
                recipient_list=[user.email],
                fail_silently=False,
            )
            return JsonResponse({'message': 'Correo de recuperación enviado'}, status=200)
        except Exception as e:
            return JsonResponse({'error': f'Error al enviar el correo: {str(e)}'}, status=500)


class PasswordResetView(View):
    def post(self, request, uidb64, token):
        data = request.POST
        new_password = data.get('new_password')

        try:
            # Decodificar uidb64
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            # Validar token
            token_generator = PasswordResetTokenGenerator()
            if not token_generator.check_token(user, token):
                return JsonResponse({'error': 'Token inválido o expirado'}, status=400)

            # Cambiar contraseña
            user.set_password(new_password)
            user.save()

            return JsonResponse({'message': 'Contraseña actualizada correctamente'}, status=200)

        except (User.DoesNotExist, ValueError):
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
# -----------------------------------------------------------------

# -------------------- Validaciones para el CRUD de Consultas Agendadas --------------------
def validar_disponibilidad(rut_prestador, fecha, hora):
    try:
        dia_semana = Horario_Prestadores.traducir_dia(fecha)
        horario = Horario_Prestadores.objects.get(rut_prestador=rut_prestador, dia=dia_semana)
        hora_solicitada_obj = datetime.strptime(hora, '%H:%M:%S').time()
        
        if not (horario.hora_inicio <= hora_solicitada_obj <= horario.hora_fin):
            return {'disponible': False, 'error': 'El prestador no está disponible a esa hora.'}

        conflicto = Consultas_Agendadas.objects.filter(
            rut_prestador=rut_prestador,
            fecha=fecha,
            hora_inicio=hora_solicitada_obj
        ).exists()

        if conflicto:
            return {'disponible': False, 'error': 'El prestador ya tiene una cita en ese horario.'}

        return {'disponible': True}

    except Horario_Prestadores.DoesNotExist:
        return {'disponible': False, 'error': 'El prestador no trabaja en ese día.'}

def validar_limite_diario(usuario, fecha, servicio=None):
    # Verificar si el usuario ya tiene una cita ese mismo día
    conflicto_diario = Consultas_Agendadas.objects.filter(
        rut_usuario=usuario,
        fecha=fecha
    ).exists()

    # Si ya existe una cita para ese día, devolver error
    if conflicto_diario:
        return {'disponible': False, 'error': 'Solo se permite una cita por día para el usuario.'}

    # Si no hay conflicto, está disponible
    return {'disponible': True}
# -----------------------------------------------------------------------


def invalidate_cache(prefix="citas_"):
    """
    Invalida todas las claves de caché relacionadas con citas.
    """
    # Recupera todas las claves relevantes (si las estás almacenando)
    keys = cache.get("cache_keys", [])
    for key in keys:
        if key.startswith(prefix):
            cache.delete(key)
    # Opcional: Limpia la lista de claves almacenadas si es necesario
    keys = [key for key in keys if not key.startswith(prefix)]
    cache.set("cache_keys", keys, None)




# -------------------- CRUD para Consultas Agendadas --------------------
class ConsultasAgendadasViewSet(viewsets.ModelViewSet):
    queryset = Consultas_Agendadas.objects.all()
    serializer_class = ConsultaAgendadaSerializer

    def list(self, request, *args, **kwargs):
        """
        Lista de citas con filtros opcionales (fecha_inicio, fecha_fin, estado).
        Resultados cacheados por 15 minutos.
        """
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        estado = request.query_params.get('estado')

        # Crear clave de caché
        cache_key = hashlib.md5(f"citas_{fecha_inicio}_{fecha_fin}_{estado}".encode()).hexdigest()
        citas_cache = cache.get(cache_key)
        if citas_cache:
            return Response(citas_cache, status=200)

        # Construir filtros dinámicamente
        filtro = Q()
        if fecha_inicio and fecha_fin:
            try:
                fecha_inicio = parse_date(fecha_inicio)
                fecha_fin = parse_date(fecha_fin)
                filtro &= Q(fecha__range=(fecha_inicio, fecha_fin))
            except ValueError:
                return Response({'error': 'Formato de fecha inválido'}, status=400)

        if estado:
            filtro &= Q(estado__iexact=estado)

        citas = Consultas_Agendadas.objects.select_related('rut_usuario', 'rut_prestador').filter(filtro)
        serialized_data = self.get_serializer(citas, many=True).data

        # Guardar en caché
        cache.set(cache_key, serialized_data, 60 * 15)
        return Response(serialized_data, status=200)

    def retrieve(self, request, *args, **kwargs):
        """
        Recuperar una cita específica por ID.
        """
        try:
            consulta = self.get_object()
            serializer = self.get_serializer(consulta)
            return Response(serializer.data, status=200)
        except Consultas_Agendadas.DoesNotExist:
            return Response({'error': 'Cita no encontrada'}, status=404)

    def create(self, request, *args, **kwargs):
        """
        Crear una nueva cita, con validaciones personalizadas.
        """
        datos = request.data
        try:
            usuario = Usuario.objects.get(rut=datos['rut_usuario'])
            prestador = Prestador.objects.get(rut=datos['rut_prestador'])
            fecha_cita = datos['fecha']
            hora_inicio = datos['hora_inicio']

            # Validar límite diario de citas
            validar_limite_diario(usuario, fecha_cita)
            validar_disponibilidad(prestador.rut, fecha_cita, hora_inicio)

            # Calcular hora de término (1 hora por defecto)
            duracion_servicio = timedelta(hours=1)
            hora_inicio_obj = parse_time(hora_inicio)
            hora_termino = (datetime.combine(date.today(), hora_inicio_obj) + duracion_servicio).time()

            nueva_cita = Consultas_Agendadas.objects.create(
                rut_usuario=usuario,
                rut_prestador=prestador,
                fecha=fecha_cita,
                hora_inicio=hora_inicio_obj,
                hora_termino=hora_termino,
                estado=datos.get('estado', 'pendiente'),
                servicio=prestador.servicio
            )

            # Invalidar caché
            invalidate_cache("citas_")
            return Response({'message': 'Cita creada exitosamente'}, status=201)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=400)
        except Prestador.DoesNotExist:
            return Response({'error': 'Prestador no encontrado'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        invalidate_cache("citas_")  # Invalida caché
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        invalidate_cache("citas_")  # Invalida caché
        return response


    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None):
        try:
            consulta = Consultas_Agendadas.objects.get(pk=pk)

            if consulta.estado == 'cancelado':
                return Response({"error": "Esta cita ya ha sido cancelada."}, status=400)
            if consulta.estado == 'finalizado':
                return Response({"error": "No se puede cancelar una cita finalizada."}, status=400)

            consulta.estado = 'cancelado'
            consulta.save()
            invalidate_cache("citas_")  # Invalida caché
            return Response({"success": "La cita ha sido cancelada con éxito."}, status=200)
        except Consultas_Agendadas.DoesNotExist:
            return Response({"error": "Cita no encontrada."}, status=404)
# ---------------------------------------------------------------------------


# --------------------- Horario Prestador ---------------------------------------
class HorarioPrestadoresViewSet(viewsets.ModelViewSet):
    queryset = Horario_Prestadores.objects.all()
    serializer_class = HorarioPrestadorSerializer

    def create(self, request, *args, **kwargs):
        datos = request.data
        try:
            prestador = Prestador.objects.get(rut=datos['rut_prestador'])
            nuevo_horario = Horario_Prestadores.objects.create(
                rut_prestador=prestador,
                dia=datos['dia'],
                hora_inicio=datos['hora_inicio'],
                hora_fin=datos['hora_fin'],
                hora_termino=datos['hora_termino'],
                descanso=datos['descanso']
            )
            return JsonResponse({'message': 'Horario creado exitosamente'}, status=201)
        except Prestador.DoesNotExist:
            return JsonResponse({'error': 'Prestador no registrado'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        

# -------------- Validación de disponibilidad ------------------------


class ValidarDisponibilidadView(APIView):
    def post(self, request):
        rut_prestador = request.data.get('rut_prestador')
        fecha = request.data.get('fecha')
        hora = request.data.get('hora')

        # Validar disponibilidad
        disponibilidad = validar_disponibilidad(rut_prestador, fecha, hora)
        if 'error' in disponibilidad:
            return Response(disponibilidad, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': 'El prestador está disponible.'}, status=status.HTTP_200_OK)


def pause_page(request):
    return render(request, 'pause.html', {"message": "Has excedido el tiempo máximo de uso. Por favor, toma un descanso."})

def ping(request):
    print("Encabezados recibidos:", request.headers)
    if request.method == 'POST':
        auth = JWTAuthentication().authenticate(request.Authorization)
        if auth is None:
            raise AuthenticationFailed('No autenticado')

        user = auth[0]  # El usuario autenticado
        print(request)

        try:
            usuario = Usuario.objects.get(rut=user.rut)
            usuario.last_active = now()
            usuario.save()
            return JsonResponse({'status': 'success'}, status=200)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
    return JsonResponse({'error': 'Método no permitido'}, status=405)


# ---------------------- notificacion al correo ----------------------





@api_view(['POST'])
def enviar_recordatorios_api(request):
    try:
        # Obtener la hora actual en la zona local
        ahora = localtime(now())
        print(f'Hora actual: {ahora}')
        
        # Calcular el rango de búsqueda de consultas
        tiempo_anticipacion = timedelta(hours=1)
        rango_inicio = ahora
        rango_fin = ahora + tiempo_anticipacion
        print(f'Buscando consultas entre {rango_inicio} y {rango_fin}')

        # Filtrar consultas dentro del rango
        consultas = Consultas_Agendadas.objects.filter(
            fecha=ahora.date(),  # Consultas para hoy
            recordatorio_enviado=False  # Evitar duplicados
        ).filter(
            hora_inicio__gte=ahora.time(),
            hora_inicio__lte=(rango_fin).time()
        )

        print(f'Consultas encontradas: {consultas}')

        if not consultas.exists():
            return Response({"status": "No hay consultas para enviar recordatorios."})

        for consulta in consultas:
            usuario = consulta.rut_usuario  # Ajusta según el campo del modelo
            if not hasattr(usuario, 'email') or not usuario.email:
                print(f"Usuario sin correo: {usuario}")
                continue

            # Crear mensaje del correo
            mensaje = f"""
            Hola {usuario.nombres},

            Este es un recordatorio de que tienes una cita agendada para hoy a las {consulta.hora_inicio.strftime('%H:%M')}.
            Por favor, asegúrate de estar disponible a tiempo.

            Saludos,
            Equipo de Agendamiento
            """

            try:
                # Enviar correo
                send_mail(
                    subject='Recordatorio de Cita',
                    message=mensaje,
                    from_email=None,  # Toma el EMAIL_HOST_USER configurado en settings.py
                    recipient_list=[usuario.email],
                    fail_silently=False,
                )

                # Marcar la consulta como enviada
                consulta.recordatorio_enviado = True
                consulta.save()
                print(f"Recordatorio enviado para la consulta {consulta.id_consulta}")
            except Exception as mail_error:
                print(f"Error al enviar correo para la consulta {consulta.id_consulta}: {mail_error}")

        return Response({"status": "Recordatorios enviados correctamente."})

    except Exception as e:
        return Response({"error": f"Error al enviar recordatorios: {str(e)}"}, status=500)
    
#-------------------------------------------------------------------------------------------