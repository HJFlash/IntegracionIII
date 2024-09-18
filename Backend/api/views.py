from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def registro(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        username = datos.get('username')  # Cambiado 'nombre' a 'username'
        password = datos.get('password')
        email = datos.get('email')
        if username and password and email:
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            usuario = User.objects.create_user(username=username, password=password, email=email)
            return JsonResponse({'message': 'User created successfully'}, status=201)
        return JsonResponse({'error': 'Invalid data'}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        username = datos.get('username')  # Cambiado 'nombre' a 'username'
        password = datos.get('password')  # Cambiado 'contraseña' a 'password'
        usuario = authenticate(username=username, password=password)
        if usuario is not None and usuario.is_active:
            login(request, usuario)
            return JsonResponse({'message': 'Logged in successfully'})
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'})
