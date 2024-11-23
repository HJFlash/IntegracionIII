#====================================JSON====================================#
import json
#============================================================================#

#====================================DJANGO====================================#
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.utils.dateparse import parse_date, parse_time
from django.contrib.auth.hashers import check_password
from django.contrib.auth import logout
from django.db.models import Count, Case, When
from django.db.models.functions import TruncMonth
#==============================================================================#

#============================REST FRAMEWORK===============================#
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.views import APIView
#=========================================================================#

#============================ARCHIVOS NUESTROS============================#
from .utils import obtener_tokens_para_usuario, send_notification_email, validar_disponibilidad
from .models import Usuario, Prestador, Consultas_Agendadas, Horario_Prestadores, Appointment, AdultoMayor, Datos_Para_Graficos
from .serializers import UsuarioSerializador, ConsultaAgendadaSerializer
#=========================================================================#

#=================================PYTHON=================================#
from datetime import datetime, timedelta
#========================================================================#

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        subject = data.get('subject', 'No Subject')
        message = data.get('message', '')
        recipient_list = data.get('recipient_list', [])

        send_mail(
            subject,
            message,
            'your-email@example.com',
            recipient_list,
            fail_silently=False,
        )
        return JsonResponse({'message': 'Correo enviado correctamente'})
    return JsonResponse({'error': 'Método no permitido'}, status=405)

# Decorador para verificar si el usuario tiene permiso para ver datos sensibles
def has_permission_to_view_sensitive_data(user):
    return user.has_perm('api.can_view_sensitive_data')  # Cambia 'api' por el nombre de tu aplicación

#======================================REGISTRO, LOGIN, LOGUOT(INICIO)==============================================#
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
            # Validar y procesar el RUT
            if not validarRut(serializer.validated_data['rut']):
                return JsonResponse({'error': 'Este rut no es valido'}, status=400)
            
            if Usuario.objects.filter(rut=serializer.validated_data['rut']).exists():
                return JsonResponse({'error': 'El rut ya existe'}, status=400)
            
            # Cifrar la contraseña antes de guardarla
            contrasena = serializer.validated_data['contrasena']
            usuario = serializer.save()
            usuario.set_password(contrasena)  # Cifra la contraseña antes de guardarla
            usuario.save()  # Guarda el usuario con la contraseña cifrada
            
            adultomayor = AdultoMayor(rut=usuario)
            adultomayor.save()

            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
        
        return JsonResponse({'error': serializer.errors}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('Rut')
        contrasena = datos.get('Contraseña')
        print(rut, contrasena)        
        try:
            usuario = Usuario.objects.get(rut=rut)

            if check_password(contrasena, usuario.contrasena):
                tokens = obtener_tokens_para_usuario(usuario)
                return JsonResponse({
                    'message': 'Inicio de sesión exitoso',
                    'refresh': tokens['refresh'],
                    'access': tokens['access'],
                    'primer_nombre': usuario.primer_nombre,
                    'correo_electronico': usuario.correo_electronico,
                    'segundo_nombre': usuario.segundo_nombre,
                    'primer_apellido': usuario.primer_apellido,
                    'segundo_apellido': usuario.segundo_apellido,
                    'contacto': usuario.contacto,
                    'rut': usuario.rut,
                    'tipo_usuario': usuario.tipo_usuario,

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
#======================================REGISTRO, LOGIN, LOGUOT(FINAL)==============================================#

#=======================================CRUD para Consultas Agendadas(INICIO)=======================================#
class ConsultasAgendadasViewSet(viewsets.ModelViewSet):
    queryset = Consultas_Agendadas.objects.all()
    serializer_class = ConsultaAgendadaSerializer

    def get_permissions(self):
        return []  # No requiere autenticación para ninguna acción

    def list(self, request, *args, **kwargs):
        # Obtener los parámetros de la solicitud
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')

        # Filtrar por fechas si están presentes
        if fecha_inicio and fecha_fin:
            try:
                fecha_inicio = parse_date(fecha_inicio)
                fecha_fin = parse_date(fecha_fin)
                citas = Consultas_Agendadas.objects.filter(fecha__range=(fecha_inicio, fecha_fin))
            except ValueError:
                return JsonResponse({'error': 'Formato de fecha inválido'}, status=400)
        else:
            citas = Consultas_Agendadas.objects.all()

        # Intentar obtener los datos de la caché
        citas_cache = cache.get('todas_las_citas')

        if not citas_cache:
            # Si no están en caché, serializamos las citas
            serializer = self.get_serializer(citas, many=True)
            cache.set('todas_las_citas', serializer.data, 60 * 15)  # 15 minutos
            return JsonResponse(serializer.data, safe=False, status=200)

        # Si ya están en caché, devolverlos directamente
        return JsonResponse(citas_cache, safe=False, status=200)

    def create(self, request, *args, **kwargs):
        datos = request.data
        try:
            usuario = Usuario.objects.get(rut=datos['rut_usuario'])
            prestador = Prestador.objects.get(rut=datos['rut_prestador'])

            # Validación de fecha y hora en el pasado
            fecha_cita = datos['fecha']
            hora_inicio = datos['hora_inicio']

            fecha_hora_cita = timezone.datetime.strptime(f"{fecha_cita} {hora_inicio}", '%Y-%m-%d %H:%M:%S')

            if timezone.is_naive(fecha_hora_cita):
                fecha_hora_cita = timezone.make_aware(fecha_hora_cita, timezone.get_current_timezone())

            if fecha_hora_cita < timezone.now():
                return JsonResponse({'error': 'No puedes agendar una cita en una fecha pasada.'}, status=400)

            conflicto_usuario = Consultas_Agendadas.objects.filter(
                rut_usuario=usuario.rut,
                fecha=datos['fecha'],
                hora_inicio=hora_inicio
            ).exists()

            if conflicto_usuario:
                return JsonResponse({'error': 'Ya tienes una cita programada en esa fecha/hora.'}, status=400)

            disponibilidad = validar_disponibilidad(prestador.rut, datos['fecha'], hora_inicio)
            if not disponibilidad['disponible']:
                return JsonResponse({'error': 'El prestador no está disponible en esa fecha/hora.'}, status=400)

            try:
                hora_inicio_obj = parse_time(hora_inicio)
            except ValueError:
                return JsonResponse({'error': 'Hora de inicio inválida'}, status=400)

            duracion_servicio = timedelta(hours=1)
            hora_termino = (fecha_hora_cita + duracion_servicio).time()

            nueva_cita = Consultas_Agendadas.objects.create(
                rut_usuario=usuario,
                rut_prestador=prestador,
                fecha=fecha_cita,
                hora_inicio=hora_inicio_obj,
                hora_termino=hora_termino,
                estado=datos.get('estado', 'pendiente'),
                servicio=prestador.servicio
            )

            # Invalida el caché
            cache.delete('todas_las_citas')

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

    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None):
        try:
            consulta = Consultas_Agendadas.objects.get(pk=pk)

            if consulta.estado == 'cancelado':
                return Response({"error": "Esta cita ya ha sido cancelada."}, status=status.HTTP_400_BAD_REQUEST)
            elif consulta.estado == 'finalizado':
                return Response({"error": "No se puede cancelar una cita que ya ha sido finalizada."}, status=status.HTTP_400_BAD_REQUEST)

            consulta.estado = 'cancelado'
            consulta.save()
            return Response({"success": "La cita ha sido cancelada con éxito."}, status=status.HTTP_200_OK)

        except Consultas_Agendadas.DoesNotExist:
            return Response({"error": "Cita no encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
#========================================LEER==========================================#
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
#======================================================================================#

#========================================ACTUALIZAR======================================#
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
#========================================================================================#

#========================================ELIMINAR========================================#
@csrf_exempt
def eliminar_cita(request, id):
    if request.method == 'DELETE':
        try:
            cita = Consultas_Agendadas.objects.get(id=id)
            cita.delete()  # Elimina la cita de la base de datos
            return JsonResponse({'message': 'Cita eliminada exitosamente'}, status=200)
        except Consultas_Agendadas.DoesNotExist:
            return JsonResponse({'error': 'Cita no encontrada'}, status=404)
#========================================================================================#

#=======================================CRUD para Consultas Agendadas(FINAL)=======================================#

# --------------------- Horario Prestador ---------------------------------------
class HorarioPrestadoresViewSet(viewsets.ModelViewSet):
    queryset = Horario_Prestadores.objects.all()
    #serializer_class = HorarioPrestadorSerializer

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
@api_view(['POST'])
def send_email_notification(request):
    data = request.data
    to_email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    if not to_email or not subject or not message:
        return JsonResponse({'error': 'Faltan datos'}, status=400)

    try:
        send_notification_email(to_email, subject, message)
        return JsonResponse({'success': 'Correo enviado exitosamente'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@login_required
def appointment_history(request):
    user = request.user
    appointments = Appointment.objects.filter(user=user).values('id', 'date', 'description')
    return JsonResponse(list(appointments), safe=False)

# -------------- Validación de disponibilidad ------------------------
def validar_disponibilidad(servicio, fecha, hora_inicio):
    try:
        # Obtener el prestador para el servicio solicitado
        prestadores_disponibles = Prestador.objects.filter(servicio__nombre_servicio=servicio)
        if not prestadores_disponibles:
            return {"error": "No hay prestadores disponibles para el servicio seleccionado."}

        # Traducir la fecha al día de la semana en español
        dia_semana = Horario_Prestadores.traducir_dia(fecha)

        # Buscar un prestador disponible en el horario
        for prestador in prestadores_disponibles:
            horarios = Horario_Prestadores.objects.filter(rut_prestador=prestador, dia=dia_semana)

            for horario in horarios:
                # Verificar si la hora de inicio está dentro del horario disponible, sin contar el descanso
                if (horario.hora_inicio <= hora_inicio < horario.hora_termino) and (
                    hora_inicio < horario.descanso or hora_inicio >= horario.hora_termino):
                    return {"prestador": prestador}  # Se encontró un prestador disponible

        return {"error": "No hay prestadores disponibles para el servicio y horario seleccionados."}
    except Exception as e:
        return {"error": str(e)}

class ValidarDisponibilidadView(APIView):
    def post(self, request):
        servicio = request.data.get('servicio')
        fecha = request.data.get('fecha')
        hora_inicio = request.data.get('hora_inicio')

        # Validar disponibilidad
        disponibilidad = validar_disponibilidad(servicio, fecha, hora_inicio)
        if 'error' in disponibilidad:
            return Response(disponibilidad, status=status.HTTP_400_BAD_REQUEST)

        return Response(disponibilidad, status=status.HTTP_200_OK)

class CrearConsulta(APIView):
    def post(self, request):
        # Obtener los datos del request
        servicio = request.data.get('servicio')  # Recibe el servicio solicitado
        rut_usuario = request.data.get('rut_usuario')
        fecha = request.data.get('fecha')
        hora_inicio = request.data.get('hora_inicio')

        try:
            # Convertir la fecha recibida al formato adecuado
            fecha = datetime.strptime(fecha.split('T')[0], '%Y-%m-%d').date()
        except ValueError:
            return Response({"error": "El formato de la fecha es inválido, debe ser YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener el usuario
            usuario = Usuario.objects.get(rut=rut_usuario)
        except Usuario.DoesNotExist:
            return Response({"error": "El usuario no existe."}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si ya existe una consulta en el mismo horario para el usuario
        if Consultas_Agendadas.objects.filter(rut_usuario=usuario, fecha=fecha, hora_inicio=hora_inicio).exists():
            return Response({"error": "El usuario ya tiene una consulta agendada para este horario."}, status=status.HTTP_400_BAD_REQUEST)

        # Validar disponibilidad
        disponibilidad = validar_disponibilidad(servicio, fecha, hora_inicio)
        if 'error' in disponibilidad:
            return Response(disponibilidad, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtener el prestador disponible
            prestador = disponibilidad['prestador']  # Prestador disponible obtenido en `validar_disponibilidad`

            # Crear la consulta agendada
            consulta = Consultas_Agendadas.objects.create(
                rut_usuario=usuario,
                rut_prestador=prestador,
                fecha=fecha,
                hora_inicio=hora_inicio,
                estado='pendiente'
            )

            return Response({"success": "Consulta agendada correctamente."}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
    year = request.GET.get('year', datetime.now().year)
    datos = Datos_Para_Graficos.objects.filter(fechas__year=year) \
        .values('t_consulta') \
        .annotate(cantidad=Count('t_consulta'))
    return JsonResponse(list(datos), safe=False)

def obtener_datos_grafico_barras(request):
    acno = request.GET.get('year', str(datetime.now().year))
    
    try:
        acno = int(acno)
    except ValueError:
        return JsonResponse({'error': 'Año inválido'}, status=400)

    todos_los_servicios = Datos_Para_Graficos.objects.values('t_consulta').distinct()

    datos = Datos_Para_Graficos.objects.filter(fechas__year=acno).values('t_consulta').annotate(
        hombres=Count(Case(When(genero_persona='m', then=1))),
        mujeres=Count(Case(When(genero_persona='f', then=1)))
    )

    datos_dict = {item['t_consulta']: item for item in datos}

    resultados_completos = []
    for servicio in todos_los_servicios:
        servicio_nombre = servicio['t_consulta']
        if servicio_nombre in datos_dict:
            resultados_completos.append(datos_dict[servicio_nombre])
        else:
            resultados_completos.append({
                't_consulta': servicio_nombre,
                'hombres': 0,
                'mujeres': 0
            })
    
    return JsonResponse(resultados_completos, safe=False)
    

def obtener_datos_grafico_linea(request):

    acno = request.GET.get('year', str(datetime.now().year))
    
    try:
        acno = int(acno)
    except ValueError:
        return JsonResponse({'error': 'Año inválido'}, status=400)

    # Filtrar por el año especificado
    datos_hombres = (
        Datos_Para_Graficos.objects.filter(genero_persona='m', fechas__year=acno)
        .annotate(mes=TruncMonth('fechas'))
        .values('mes')
        .annotate(cantidad_solicitudes=Count('id_consultas'))
        .order_by('mes')
    )

    datos_mujeres = (
        Datos_Para_Graficos.objects.filter(genero_persona='f', fechas__year=acno)
        .annotate(mes=TruncMonth('fechas'))
        .values('mes')
        .annotate(cantidad_solicitudes=Count('id_consultas'))
        .order_by('mes')
    )

    # Nombres de los meses
    meses_nombres = [
        'En', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ]

    # Inicia un diccionario con valores predeterminados para hombres y mujeres
    datos_finales = {mes: {'hombres': 0, 'mujeres': 0} for mes in meses_nombres}

    # Asigna los datos de los hombres
    for dato in datos_hombres:
        mes_num = dato['mes'].month
        datos_finales[meses_nombres[mes_num - 1]]['hombres'] = dato['cantidad_solicitudes']

    # Asigna los datos de las mujeres
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

def obtener_datos_barra_asistencia(request):
    datos_si = (
        Datos_Para_Graficos.objects.filter(asistencia='si')
    )
    datos_no= (
        Datos_Para_Graficos.objects.filter(asistencia='no')
    )

    total = datos_si.count() + datos_no.count()
    porcentaje_si = (datos_si.count() / total) * 100 if total > 0 else 0
    porcentaje_no = (datos_no.count() / total) * 100 if total > 0 else 0

    values  = [
        {"value": porcentaje_si, "color": "#58d68d"},
        {"value": porcentaje_no, "color": "#e74c3c"}
    ]

    return JsonResponse({'values': values})

def obtener_datos_grafico_asistencia_consultorio(request):
    consulta_data=[]

    for consultorio in range(1, 8):
        data = Datos_Para_Graficos.objects.filter(consultorio=consultorio)

        si_count = data.filter(asistencia="si").count()
        no_count = data.filter(asistencia="no").count()

        consulta_data.append({
            'consultorio': consultorio,
            'si': si_count,
            'no': no_count,
        })


    return JsonResponse(consulta_data, safe=False)


# graficos datos mensuales
def obtener_datos_grafico_torta_mes(request):
    year = request.GET.get('year', datetime.now().year)
    month = request.GET.get('month', datetime.now().month)
    datos = Datos_Para_Graficos.objects.filter(fechas__year=year, fechas__month=month) \
        .values('t_consulta') \
        .annotate(cantidad=Count('t_consulta'))
    return JsonResponse(list(datos), safe=False)

def obtener_datos_grafico_barras_mes(request):
    acno = request.GET.get('year', str(datetime.now().year))
    month = request.GET.get('month', datetime.now().month)
    
    try:
        acno = int(acno)
        month = int(month)
    except ValueError:
        return JsonResponse({'error': 'Año o mes inválido'}, status=400)
    
    if month < 1 or month > 12:
        return JsonResponse({'error': 'Mes inválido'}, status=400)

    todos_los_servicios = Datos_Para_Graficos.objects.values('t_consulta').distinct()

    datos = Datos_Para_Graficos.objects.filter(fechas__year=acno, fechas__month=month).values('t_consulta').annotate(
        hombres=Count(Case(When(genero_persona='m', then=1))),
        mujeres=Count(Case(When(genero_persona='f', then=1)))
    )

    datos_dict = {item['t_consulta']: item for item in datos}

    resultados_completos = []
    for servicio in todos_los_servicios:
        servicio_nombre = servicio['t_consulta']
        if servicio_nombre in datos_dict:
            resultados_completos.append(datos_dict[servicio_nombre])
        else:
            resultados_completos.append({
                't_consulta': servicio_nombre,
                'hombres': 0,
                'mujeres': 0
            })
    
    return JsonResponse(resultados_completos, safe=False)


def obtener_datos_grafico_asistencia_consultorio_mes(request):
    month = int(request.GET.get('month', datetime.now().month))
    year = int(request.GET.get('year', datetime.now().year))
    
    consulta_data = []

    for consultorio in range(1, 8):
        data = Datos_Para_Graficos.objects.filter(
            consultorio=consultorio, fechas__year=year, fechas__month=month
        )

        si_count = data.filter(asistencia="si").count()
        no_count = data.filter(asistencia="no").count()

        consulta_data.append({
            'consultorio': consultorio,
            'si': si_count,
            'no': no_count,
        })

    return JsonResponse(consulta_data, safe=False)

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
    datos = Usuario.objects.filter(tipo_usuario="adultomayor").values()
    return JsonResponse(list(datos), safe=False)

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
def actualizar_estado_usuario(request, rut):
    if request.method == 'POST':
            
            data = json.loads(request.body)
            nuevo_estado = data.get('estado_solicitud')
            
            usuario = Usuario.objects.get(rut=rut)
            usuario.estado_solicitud = nuevo_estado
            usuario.save()
            
    return JsonResponse({'message': 'Estado actualizado exitosamente'}, status=200)