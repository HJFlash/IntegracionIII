from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

@csrf_exempt
def registro(request):
    if request.method == 'POST':
        datos = json.loads(request.body)

        print(datos)
        
        # Campos obligatorios
        rut = datos.get('Rut')
        password = datos.get('Contraseña')
        email = datos.get('Email')
        nombre = datos.get('Nombre')
        apellidos = datos.get('Apellidos')
        telefono = datos.get('Telefono')
        sector = datos.get('Sector')
        calle = datos.get('Calle')
        ncasa = datos.get('Ncasa')

        # Validación de campos
        if not all([rut, password, email, nombre, apellidos, telefono, sector, calle, ncasa]):
            return JsonResponse({'error': 'Todos los campos son obligatorios'}, status=400)

        # Verificación de que el RUT sea único
        if User.objects.filter(username=rut).exists():
            return JsonResponse({'error': 'El RUT ya está registrado'}, status=400)

        # Crear el usuario
        try:
            usuario = User.objects.create_user(username=rut, password=password, email=email)
            usuario.first_name = nombre
            usuario.last_name = apellidos
            usuario.save()
            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('Rut')
        password = datos.get('Contraseña')
        
        # Intentar autenticar al usuario
        usuario = authenticate(username=rut, password=password)
        
        if usuario is None:
            # Si el usuario no se encuentra, verificamos si el RUT es válido
            if User.objects.filter(username=rut).exists():
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)
            else:
                return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        # Si el usuario existe y está activo
        if usuario.is_active:
            login(request, usuario)
            return JsonResponse({'message': 'Inicio de sesión exitoso'})
        
        return JsonResponse({'error': 'Usuario inactivo'}, status=403)

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        # Si estás utilizando sesiones
        logout(request)
        return JsonResponse({'message': 'Desconexión exitosa'})
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required
def obtener_usuario(request):
    usuario = request.user
    return JsonResponse({
        'first_name': usuario.first_name,
        'last_name': usuario.last_name,
        'username': usuario.username,
        'email': usuario.email,
    })