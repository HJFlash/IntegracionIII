from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.timezone import localtime
from datetime import timedelta, datetime
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import logout 
from rest_framework.views import APIView
import json

from .models import Usuario, Prestador, Consultas_Agendadas, Horario_Prestadores
from .serializers import UsuarioSerializador, ConsultaAgendadaSerializer, HorarioPrestadorSerializer
from .utils import obtener_tokens_para_usuario


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
            if check_password(contrasena, usuario.contrasena):
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
    
# -------------------- CRUD para Consultas Agendadas --------------------

# -------------------- CRUD para Consultas Agendadas --------------------

class ConsultasAgendadasViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Consultas_Agendadas.objects.all()
    serializer_class = ConsultaAgendadaSerializer
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder
    
    def perform_create(self, serializer):
        consulta = serializer.save()
        # Ya no necesitas asignar el servicio aquí, lo harás en el método create

    def create(self, request, *args, **kwargs):
        datos = request.data
        try:
            usuario = Usuario.objects.get(rut=datos['rut_usuario'])
            prestador = Prestador.objects.get(rut=datos['rut_prestador'])

            # Crear la cita, el servicio se tomará automáticamente
            nueva_cita = Consultas_Agendadas.objects.create(
                rut_usuario=usuario,
                rut_prestador=prestador,
                fecha=datos['fecha'],
                hora_inicio=datos['hora_inicio'],
                estado=datos.get('estado', 'pendiente'),
                servicio=prestador.servicio  # Asignar el servicio del prestador
            )
            return JsonResponse({'message': 'Cita creada exitosamente'}, status=201)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=400)
        except Prestador.DoesNotExist:
            return JsonResponse({'error': 'Prestador no encontrado'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)



# -------------------- LEER --------------------
@csrf_exempt
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
        
# -------------- Validacion de disponibilidad ------------------------

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
