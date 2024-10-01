from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required, user_passes_test
import json

from .models import Usuario, Consultas_Agendadas
from django.contrib.auth.hashers import check_password, make_password
from .serializers import UsuarioSerializador
from rest_framework.authtoken.models import Token

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
        
        # Extraer datos del cuerpo de la solicitud
        rut = datos.get('rut')
        nombres = datos.get('nombres')
        apellidos = datos.get('apellidos')
        contrasena = datos.get('contrasena')
        contacto = datos.get('contacto')
        calle = datos.get('calle')
        num_casa = datos.get('num_casa')
        num_apar = datos.get('num_apar')
        id_centro = datos.get('id_centro')
        
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
                num_apar=num_apar,
                id_centro=id_centro
            )
            validUser.save()

            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
        return JsonResponse({'error': 'Datos inválidos'}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('rut')  # Autenticación basada en el rut
        contrasena = datos.get('contrasena')
        
        try:
            # Buscar el usuario por rut
            usuario = Usuario.objects.get(rut=rut)
            
            # Verificar la contraseña usando check_password
            if check_password(contrasena, usuario.contrasena):
                login(request, usuario)  # Iniciar sesión
                return JsonResponse({'message': 'Inicio de sesión exitoso'}, status=200)
            else:
                return JsonResponse({'error': 'Credenciales inválidas'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)  # Cerrar sesión
        return JsonResponse({'message': 'Cierre de sesión exitoso'}, status=200)