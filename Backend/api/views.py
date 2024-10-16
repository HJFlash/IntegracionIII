from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required, user_passes_test
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import obtener_tokens_para_usuario
import json

from .models import Usuario,Prestador ,Consultas_Agendadas
from django.contrib.auth.hashers import check_password, make_password
from .serializers import UsuarioSerializador, ConsultaAgendadaSerializer
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

"""
    ---------------registro----------            
        Fnombre = datos.get('Fnombre')
        Snombre = datos.get('Snombre')
        Fapellido = datos.get('Fapellido')
        Sapellido = datos.get('Sapellido') 
        
        
        if rut and Fnombre and Fapellido:
        
        validUser = Usuario(rut=rut, Fnombre=Fnombre, Snombre=Snombre, Fapellido=Fapellido, Sapellido=Sapellido, contrasena=contrasena, contacto=contacto, calle=calle, num_casa=num_casa, num_apar=num_apar, id_centro=id_centro)
"""

# Decorador, verifica si el usuario tiene permiso para ver los datos sensibles
def has_permission_to_view_sensitive_data(user):
    return user.has_perm('api.can_view_sensitive_data')  # Cambia 'tu_aplicacion' por el nombre de tu aplicación


@csrf_exempt
def registro(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        print(datos)
        # Extraer datos del cuerpo de la solicitud
        rut = datos.get('Rut')
        nombres = datos.get('Nombre')
        apellidos = datos.get('Apellidos')
        contrasena = datos.get('Contraseña')
        contacto = datos.get('Telefono')
        calle = datos.get('Sector')
        num_casa = datos.get('Calle')
        num_apar = datos.get('Ncasa')
        print(rut)
        
        # Verificar que los campos necesarios estén presentes
        if rut and nombres and apellidos and contrasena:
            # Comprobar si el usuario ya existe
            if Usuario.objects.filter(rut=rut).exists():
                return JsonResponse({'error': 'El rut ya existe'}, status=400)
            
            # Encriptar la contraseña
            contrasena_encriptada = make_password(contrasena)
            
            # Crear y guardar el nuevo usuario
            validUser = Usuario(
                rut=rut,
                nombres=nombres,
                apellidos=apellidos,
                contrasena=contrasena_encriptada,  # Guardar la contraseña encriptada
                contacto=contacto,
                calle=calle,
                num_casa=num_casa,
                num_apar=num_apar
            )
            validUser.save()

            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
        return JsonResponse({'error': 'Datos inválidos'}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('Rut')  # Autenticación basada en el rut
        contrasena = datos.get('Contraseña')
        
        try:
            # Buscar el usuario por rut
            usuario = Usuario.objects.get(rut=rut)
            
            # Verificar la contraseña usando check_password
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

class ConsultasAgendadasViewSet(viewsets.ModelViewSet):
    queryset = Consultas_Agendadas.objects.all()
    serializer_class = ConsultaAgendadaSerializer
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder

    def create(self, request, *args, **kwargs):
        datos = request.data  # Usamos request.data para obtener los datos
        print(datos)
        try:
        # Asegúrate de que las claves coincidan con las enviadas en el JSON
            usuario = Usuario.objects.get(rut=datos['usuario'])
            prestador = Prestador.objects.get(rut=datos['prestador'])

            nueva_cita = Consultas_Agendadas.objects.create(
                rut_usuario=usuario,
                rut_prestador=prestador,
                fecha=datos['fecha'],
                hora_inicio=datos['hora_inicio'],
                estado=datos.get('estado', 'pendiente'),
            )
            return JsonResponse({'message': 'Cita creada exitosamente'}, status=201)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=400)
        except Prestador.DoesNotExist:
            return JsonResponse({'error': 'Prestador no encontrado'}, status=400)
        except Exception as e:
            print(str(e))  # Imprimir el error para diagnóstico
            return JsonResponse({'error': str(e)}, status=400)
