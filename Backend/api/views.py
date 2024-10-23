from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required, user_passes_test
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import obtener_tokens_para_usuario
from django.utils.timezone import localtime
from datetime import datetime, timedelta, date
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import logout 
from rest_framework.views import APIView
from django.utils.dateparse import parse_date, parse_time
import json

from .models import Usuario, Prestador, Consultas_Agendadas, Horario_Prestadores
from .serializers import UsuarioSerializador, ConsultaAgendadaSerializer, HorarioPrestadorSerializer
from .utils import obtener_tokens_para_usuario
from django.views.decorators.cache import cache_page
from django.core.cache import cache









"""
    ---------------registro----------            
        Fnombre = datos.get('Fnombre')
        Snombre = datos.get('Snombre')
        Fapellido = datos.get('Fapellido')
        Sapellido = datos.get('Sapellido') 
        
        
        if rut and Fnombre and Fapellido:
        
        validUser = Usuario(rut=rut, Fnombre=Fnombre, Snombre=Snombre, Fapellido=Fapellido, Sapellido=Sapellido, contrasena=contrasena, contacto=contacto, calle=calle, num_casa=num_casa, num_apar=num_apar, id_centro=id_centro)
"""

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json

from .models import Usuario, Consultas_Agendadas, Prestador
from django.contrib.auth.hashers import check_password, make_password
from .serializers import UsuarioSerializador, ConsultaAgendadaSerializer
from .utils import obtener_tokens_para_usuario
from django.contrib.auth.hashers import check_password
from django.contrib.auth import logout  # Asegúrate de que esta línea esté presente
from django.http import JsonResponse
from django.utils.dateparse import parse_date,parse_time
from django.core.cache import cache
from datetime import datetime, timedelta, date
from django.views.decorators.cache import cache_page


"correo"
from django.core.mail import send_mail
from django.conf import settings
# from django.http import JsonResponse tambien se importa arriba
from django.views.decorators.csrf import csrf_exempt
# import json ya se importó arriba



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
    def validarRut(rut):
        listed_rut = [int(n) for n in str(rut)]
        #######
        if (len(listed_rut) == 5):  # Si queremos meter usuarios de prueba hagamoslo con ruts de 5 numeros ### DELETEAR EN EL FUTURO ###
            return True
        #######
        if (len(listed_rut) < 8 or len(listed_rut) > 9): # Tiene que tener entre 8 y 9 digitos
            return False
        reversed_rut = listed_rut[::-1]
        dig_verificador = reversed_rut.pop(0)
        multiplicator = 2
        suma = 0
        while (len(reversed_rut) > 0):
            for x in range(0, len(listed_rut) - 1):
                suma += multiplicator * reversed_rut.pop(0)  
                multiplicator += 1
                if (multiplicator == 8):
                    multiplicator = 2
        resto = suma % 11
        if resto == 1 or resto == 0:
            resto = 11
        if (11 - resto == dig_verificador):
            return True
        else:
            return False

    if request.method == 'POST':
        datos = json.loads(request.body)
        
        serializer = UsuarioSerializador(data=datos)

        if serializer.is_valid():

            if not validarRut(serializer.validated_data['rut']):
                return JsonResponse({'error': 'Este rut no es valido'}, status=400)

            if Usuario.objects.filter(rut=serializer.validated_data['rut']).exists():
                return JsonResponse({'error': 'El rut ya existe'}, status=400)
            
            serializer.validated_data['tipo_usuario'] = 'adultomayor'
            # Crear y guardar el nuevo usuario
            serializer.save()  # Llama a la función create del serializer

            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
        
        return JsonResponse({'error': serializer.errors}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('Rut')
        contrasena = datos.get('Contraseña')
        
        try:
            usuario = Usuario.objects.get(rut=rut)

            if check_password(contrasena, usuario.contrasena):
                tokens = obtener_tokens_para_usuario(usuario)
                return JsonResponse({
                    'message': 'Inicio de sesión exitoso',
                    'refresh': tokens['refresh'],
                    'access': tokens['access'],
                    'primer_nombre': usuario.primer_nombre
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

# -------------------- CRUD para Consultas Agendadas --------------------

class ConsultasAgendadasViewSet(viewsets.ModelViewSet):
    queryset = Consultas_Agendadas.objects.all()
    serializer_class = ConsultaAgendadaSerializer

    def get_permissions(self):
        return []  # No requiere autenticación para ninguna acción

    def list(self, request, *args, **kwargs):
        # Obtener los parámetros de la solicitud
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')

        # Imprimir para depuración
        print(f"fecha_inicio: {fecha_inicio}, fecha_fin: {fecha_fin}")

        # Filtrar por fechas si están presentes
        if fecha_inicio and fecha_fin:
            try:
                # Convertir las fechas de string a objetos date
                fecha_inicio = parse_date(fecha_inicio)
                fecha_fin = parse_date(fecha_fin)

                # Imprimir fechas después de la conversión
                print(f"fecha_inicio (convertida): {fecha_inicio}, fecha_fin (convertida): {fecha_fin}")

                # Filtrar las citas en función de las fechas
                citas = Consultas_Agendadas.objects.filter(fecha__range=(fecha_inicio, fecha_fin))
                print(f"citas filtradas: {citas}")  # Verificar las citas filtradas

            except ValueError:
                return JsonResponse({'error': 'Formato de fecha inválido'}, status=400)
        else:
            # Si no se proporcionan fechas, devolver todas las citas
            citas = Consultas_Agendadas.objects.all()

        # Intentar obtener los datos de la caché
        citas_cache = cache.get('todas_las_citas')

        if not citas_cache:
            serializer = self.get_serializer(citas, many=True)
            # Guardar en caché los resultados
            cache.set('todas_las_citas', serializer.data, 60 * 15)  # 15 minutos
            return JsonResponse(serializer.data, safe=False, status=200)

        # Si ya están en caché, devolverlos directamente
        return JsonResponse(citas_cache, safe=False, status=200)

    def create(self, request, *args, **kwargs):
        datos = request.data
        try:
            usuario = Usuario.objects.get(rut=datos['rut_usuario'])
            prestador = Prestador.objects.get(rut=datos['rut_prestador'])

            # Calcular la hora de término
            # Asumiendo que el servicio tiene una duración fija, por ejemplo, 1 hora
            duracion_servicio = timedelta(hours=1)  # Cambiar según sea necesario

            hora_inicio = datos['hora_inicio']  # Suponiendo que esto se envía en el formato adecuado
            # Convertir a objeto de tiempo
            hora_inicio_obj = parse_time(hora_inicio)  # Asegúrate de tener importado parse_time
            hora_termino = (datetime.combine(date.today(), hora_inicio_obj) + duracion_servicio).time()

            nueva_cita = Consultas_Agendadas.objects.create(
                rut_usuario=usuario,
                rut_prestador=prestador,
                fecha=datos['fecha'],
                hora_inicio=hora_inicio_obj,
                hora_termino=hora_termino,  # Asignar la hora de término calculada
                estado=datos.get('estado', 'pendiente'),
                servicio=prestador.servicio  # Asignar el servicio del prestador
            )

            cache.delete('todas_las_citas')  # Invalida el caché
            return JsonResponse({'message': 'Cita creada exitosamente'}, status=201)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=400)
        except Prestador.DoesNotExist:
            return JsonResponse({'error': 'Prestador no encontrado'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('todas_las_citas')  # Invalida el caché
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('todas_las_citas')  # Invalida el caché
        return response

# -------------------- LEER --------------------
@csrf_exempt
@cache_page(60 * 15)  # Cachear por 15 minutos
def obtener_citas(request):
    if request.method == 'GET':
        citas = Consultas_Agendadas.objects.all()
        serializer = ConsultaAgendadaSerializer(citas, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def obtener_cita_por_id(request, id):  # Cambié el parámetro a 'id'
    if request.method == 'GET':
        try:
            # Buscamos la cita por 'id_consulta' usando el valor de 'id' que recibimos
            cita = Consultas_Agendadas.objects.get(id_consulta=id)
            serializer = ConsultaAgendadaSerializer(cita)
            return JsonResponse(serializer.data, safe=False, status=200)
        except Consultas_Agendadas.DoesNotExist:
            return JsonResponse({'error': 'Cita no encontrada'}, status=404)

# -------------------- ACTUALIZAR --------------------
@csrf_exempt
def actualizar_cita(request, id_consulta):
    if request.method == 'PUT':
        try:
            # Buscamos la cita por id_consulta
            cita = Consultas_Agendadas.objects.get(id_consulta=id_consulta)
            data = json.loads(request.body)
            serializer = ConsultaAgendadaSerializer(cita, data=data, partial=True)  # partial=True permite actualización parcial
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False, status=200)
            return JsonResponse(serializer.errors, status=400)
        except Consultas_Agendadas.DoesNotExist:
            return JsonResponse({'error': 'Cita no encontrada'}, status=404)

# -------------------- ELIMINAR --------------------

@csrf_exempt
def eliminar_cita(request, id):
    if request.method == 'DELETE':
        try:
            cita = Consultas_Agendadas.objects.get(id=id)
            cita.delete()  # Elimina la cita de la base de datos
            return JsonResponse({'message': 'Cita eliminada exitosamente'}, status=200)
        except Consultas_Agendadas.DoesNotExist:
            return JsonResponse({'error': 'Cita no encontrada'}, status=404)


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
        
# Función para enviar correos
def enviar_notificacion_correo(destinatario, asunto, mensaje):
    send_mail(
        asunto,
        mensaje,
        settings.EMAIL_HOST_USER,
        [destinatario],
        fail_silently=False,
    )
        

# Vista que recibe la solicitud y envía el correo
@csrf_exempt
def enviar_correo(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        destinatario = datos['destinatario']
        asunto = datos['asunto']
        mensaje = datos['mensaje']
        
        enviar_notificacion_correo(destinatario, asunto, mensaje)
        
        return JsonResponse({'mensaje': 'Correo enviado correctamente'})
    return JsonResponse({'error': 'Método no permitido'}, status=405)
# -------------- Validación de disponibilidad ------------------------

class ValidarDisponibilidadView(APIView):
    def post(self, request):
        rut_prestador = request.data.get('rut_prestador')
        fecha = request.data.get('fecha')  # Fecha en formato 'YYYY-MM-DD'
        hora = request.data.get('hora')  # Hora en formato 'HH:MM'

        # Obtener el día de la semana de la fecha en español
        dia_semana = Horario_Prestadores.traducir_dia(fecha)
        # Imprimir el día de la semana para verificación
        print(f"Verificando disponibilidad para: {rut_prestador}, Fecha: {fecha}, Día: {dia_semana}, Hora: {hora}")

        # Verificar si el prestador trabaja ese día
        try:
            horario = Horario_Prestadores.objects.get(rut_prestador=rut_prestador, dia=dia_semana)
            print(f"Horario encontrado: {horario}")  # Imprimir horario encontrado
        except Horario_Prestadores.DoesNotExist:
            return Response({'error': 'El prestador no trabaja en ese día.'}, status=status.HTTP_400_BAD_REQUEST)

        # Convertir la hora solicitada en un objeto de tiempo
        hora_solicitada = datetime.strptime(hora, '%H:%M:%S').time()
        
        # Imprimir las horas de trabajo para verificación
        print(f"Horario de trabajo: Inicio: {horario.hora_inicio}, Fin: {horario.hora_fin}")

        # Verificar si la hora está dentro del horario de trabajo del prestador
        if not (horario.hora_inicio <= hora_solicitada <= horario.hora_fin):
            return Response({'error': 'El prestador no está disponible a esa hora.'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si ya hay una consulta en ese horario
        consulta_conflicto = Consultas_Agendadas.objects.filter(
            rut_prestador=rut_prestador,
            fecha=fecha,
            hora_inicio=hora_solicitada
        ).exists()

        if consulta_conflicto:
            return Response({'error': 'El prestador ya tiene una cita en ese horario.'}, status=status.HTTP_400_BAD_REQUEST)

        # Si todo está bien, el prestador está disponible
        return Response({'success': 'El prestador está disponible.'}, status=status.HTTP_200_OK)


# Clase para la creación de consultas
class CrearConsulta(APIView):
    def post(self, request):
        # Obtener los datos del request
        rut_prestador = request.data.get('rut_prestador')
        fecha = request.data.get('fecha')
        hora = request.data.get('hora')

        # Validar disponibilidad
        validar_disponibilidad = ValidarDisponibilidadView()
        response = validar_disponibilidad.post(request)

        if response.status_code != status.HTTP_200_OK:
            return response  # Si no está disponible, retorna el mensaje de error

        # Si está disponible, proceder a crear la consulta
        consulta = Consultas_Agendadas.objects.create(
            rut_usuario=request.data.get('rut_usuario'),
            rut_prestador=rut_prestador,
            fecha=fecha,
            hora_inicio=hora,
            estado='pendiente'
        )

        return Response({"success": "Consulta agendada correctamente."}, status=status.HTTP_201_CREATED)

    
from .models import Datos_Para_Graficos
from django.db.models import Count, Case, When, IntegerField, Value
from django.db.models.functions import ExtractMonth, TruncMonth


@csrf_exempt
def DatosGraficos(request):
    if request.method == 'POST':
        try:
            # Cargar los datos del cuerpo de la solicitud
            datos = json.loads(request.body)
            print(datos)
            
            # Extraer datos del cuerpo de la solicitud
            fechas = datos.get('fechas')
            horas = datos.get('horas')
            t_consulta = datos.get('t_consulta')
            genero_persona = datos.get('genero_persona')
            
            # Verificar que los datos obligatorios están presentes
            if not (fechas and horas and genero_persona):
                return JsonResponse({'error': 'Faltan campos obligatorios'}, status=400)
            
            # Crear y guardar la nueva instancia de Datos_Para_Graficos
            nueva_dato = Datos_Para_Graficos.objects.create(
                fechas=fechas,
                horas=horas,
                t_consulta=t_consulta,
                genero_persona=genero_persona
            )

            # Retornar una respuesta exitosa con el id de la nueva instancia
            return JsonResponse({'mensaje': 'Dato creado con éxito', 'id': nueva_dato.id_consultas}, status=201)
        
        except Exception as e:
            # Manejar errores y retornar una respuesta de error
            return JsonResponse({'error': str(e)}, status=500)
    
    # Si no es un método POST, devolver error
    return JsonResponse({'error': 'Método no permitido'}, status=405)



def obtener_datos_grafico_torta(request):
    datos = Datos_Para_Graficos.objects.values('t_consulta').annotate(cantidad=Count('t_consulta'))
    return JsonResponse(list(datos), safe=False)


def obtener_datos_grafico_barras(request):
    datos = Datos_Para_Graficos.objects.values('t_consulta').annotate(
        hombres=Count(Case(When(genero_persona='m', then=1))),
        mujeres=Count(Case(When(genero_persona='f', then=1)))
    )
    return JsonResponse(list(datos), safe=False)
    

def obtener_datos_grafico_linea(request):
    datos_hombres = (
        Datos_Para_Graficos.objects.filter(genero_persona='m')
        .annotate(mes=TruncMonth('fechas'))
        .values('mes')
        .annotate(cantidad_solicitudes=Count('id_consultas'))
        .order_by('mes')
    )

    datos_mujeres = (
        Datos_Para_Graficos.objects.filter(genero_persona='f')
        .annotate(mes=TruncMonth('fechas'))
        .values('mes')
        .annotate(cantidad_solicitudes=Count('id_consultas'))
        .order_by('mes')
    )


    meses_nombres = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]


    datos_finales = {mes: {'hombres': 0, 'mujeres': 0} for mes in meses_nombres}


    for dato in datos_hombres:
        mes_num = dato['mes'].month 
        datos_finales[meses_nombres[mes_num - 1]]['hombres'] = dato['cantidad_solicitudes']


    for dato in datos_mujeres:
        mes_num = dato['mes'].month
        datos_finales[meses_nombres[mes_num - 1]]['mujeres'] = dato['cantidad_solicitudes']

    respuesta_final = []
    for mes, conteo in datos_finales.items():
        respuesta_final.append({
            'mes': mes,
            'cantidad_hombres': conteo['hombres'],
            'cantidad_mujeres': conteo['mujeres']
        })

    return JsonResponse(respuesta_final, safe=False)


@csrf_exempt
def registroTrabajador(request):
    if request.method == 'POST':
        try:
            # Cargar los datos del cuerpo de la solicitud
            datos = json.loads(request.body)
            print(datos)
            
            # Extraer datos del cuerpo de la solicitud
            rut = datos.get('rut')
            primer_nombre = datos.get('primer_nombre')
            segundo_nombre = datos.get('segundo_nombre')
            primer_apellido = datos.get('primer_apellido')
            segundo_apellido = datos.get('segundo_apellido')
            contrasena = datos.get('contrasena')
            contacto = datos.get('contacto')
            calle = datos.get('calle')
            num_casa = datos.get('num_casa')
            num_apar = datos.get('num_apar')
    
            # Crear y guardar la nueva instancia de 
            nueva_datos = Usuario.objects.create(
                rut=rut,
                primer_nombre=primer_nombre,
                segundo_nombre=segundo_nombre,
                primer_apellido=primer_apellido,
                segundo_apellido=segundo_apellido,
                contrasena=contrasena,
                contacto=contacto,
                calle=calle,
                num_casa=num_casa,
                num_apar=num_apar,
                tipo_usuario='prestador'
            )
            return JsonResponse({'mensaje': 'Dato creado con éxito', 'id': nueva_datos.rut}, status=201)

        except Exception as e:
            # Manejar errores y retornar una respuesta de error
            return JsonResponse({'error': str(e)}, status=500)
    
    # Si no es un método POST, devolver error
    return JsonResponse({'error': 'Método no permitido'}, status=405)

def obtener_datos_soli_registro(request):
    datos = Usuario.objects.values()
    return JsonResponse(list(datos), safe=False)


from rest_framework import status, viewsets


 
class ConsultasAgendadasViewSet(viewsets.ModelViewSet):
    queryset = Consultas_Agendadas.objects.all()
    serializer_class = ConsultaAgendadaSerializer

    def get_permissions(self):
        return []  # No requiere autenticación para ninguna acción

    def list(self, request, *args, **kwargs):
        # Obtener los parámetros de la solicitud
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')

        # Imprimir para depuración
        print(f"fecha_inicio: {fecha_inicio}, fecha_fin: {fecha_fin}")

        # Filtrar por fechas si están presentes
        if fecha_inicio and fecha_fin:
            try:
                # Convertir las fechas de string a objetos date
                fecha_inicio = parse_date(fecha_inicio)
                fecha_fin = parse_date(fecha_fin)

                # Imprimir fechas después de la conversión
                print(f"fecha_inicio (convertida): {fecha_inicio}, fecha_fin (convertida): {fecha_fin}")

                # Filtrar las citas en función de las fechas
                citas = Consultas_Agendadas.objects.filter(fecha__range=(fecha_inicio, fecha_fin))
                print(f"citas filtradas: {citas}")  # Verificar las citas filtradas

            except ValueError:
                return JsonResponse({'error': 'Formato de fecha inválido'}, status=400)
        else:
            # Si no se proporcionan fechas, devolver todas las citas
            citas = Consultas_Agendadas.objects.all()

        # Intentar obtener los datos de la caché
        citas_cache = cache.get('todas_las_citas')

        if not citas_cache:
            serializer = self.get_serializer(citas, many=True)
            # Guardar en caché los resultados
            cache.set('todas_las_citas', serializer.data, 60 * 15)  # 15 minutos
            return JsonResponse(serializer.data, safe=False, status=200)

        # Si ya están en caché, devolverlos directamente
        return JsonResponse(citas_cache, safe=False, status=200)

    def create(self, request, *args, **kwargs):
        datos = request.data
        try:
            usuario = Usuario.objects.get(rut=datos['rut_usuario'])
            prestador = Prestador.objects.get(rut=datos['rut_prestador'])

            # Calcular la hora de término
            # Asumiendo que el servicio tiene una duración fija, por ejemplo, 1 hora
            duracion_servicio = timedelta(hours=1)  # Cambiar según sea necesario

            hora_inicio = datos['hora_inicio']  # Suponiendo que esto se envía en el formato adecuado
            # Convertir a objeto de tiempo
            hora_inicio_obj = parse_time(hora_inicio)  # Asegúrate de tener importado parse_time
            hora_termino = (datetime.combine(date.today(), hora_inicio_obj) + duracion_servicio).time()

            nueva_cita = Consultas_Agendadas.objects.create(
                rut_usuario=usuario,
                rut_prestador=prestador,
                fecha=datos['fecha'],
                hora_inicio=hora_inicio_obj,
                hora_termino=hora_termino,  # Asignar la hora de término calculada
                estado=datos.get('estado', 'pendiente'),
                servicio=prestador.servicio  # Asignar el servicio del prestador
            )

            cache.delete('todas_las_citas')  # Invalida el caché
            return JsonResponse({'message': 'Cita creada exitosamente'}, status=201)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=400)
        except Prestador.DoesNotExist:
            return JsonResponse({'error': 'Prestador no encontrado'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('todas_las_citas')  # Invalida el caché
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('todas_las_citas')  # Invalida el caché
        return response