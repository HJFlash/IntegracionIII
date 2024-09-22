from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def registro(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        username = datos.get('Nombre')
        password = datos.get('Contraseña')
        email = datos.get('Email')
        if username and password and email:
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'El nombre de usuario ya existe'}, status=400)
            usuario = User.objects.create_user(username=username, password=password, email=email)
            return JsonResponse({'message': 'Usuario credo exitosamente'}, status=201)
        return JsonResponse({'error': 'Datos invalidos'}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        username = datos.get('Nombre')
        password = datos.get('Contraseña')
        usuario = authenticate(username=username, password=password)
        if usuario is not None and usuario.is_active:
            login(request, usuario)
            return JsonResponse({'message': 'Inicio de sesion exitoso'})
        return JsonResponse({'error': 'Credenciales Invalidas'}, status=401)

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Desconexion exitosa'})
