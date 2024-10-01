from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Usuario, Consultas_Agendadas
from .serializers import UsuarioSerializador
from rest_framework.authtoken.models import Token


@csrf_exempt
def registro(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('rut')
        Fnombre = datos.get('Fnombre')
        Snombre = datos.get('Snombre')
        Fapellido = datos.get('Fapellido')
        Sapellido = datos.get('Sapellido')
        contrasena = datos.get('contrasena')
        contacto = datos.get('contacto')
        calle = datos.get('calle')
        num_casa = datos.get('num_casa')
        num_apar = datos.get('num_apar')
        id_centro = datos.get('id_centro')
        if rut and Fnombre and Fapellido:
            if Usuario.objects.filter(rut=rut).exists():
                return JsonResponse({'error': 'Rut already exists'}, status=400)
            validUser = Usuario(rut=rut, Fnombre=Fnombre, Snombre=Snombre, Fapellido=Fapellido, Sapellido=Sapellido, contrasena=contrasena, contacto=contacto, calle=calle, num_casa=num_casa, num_apar=num_apar, id_centro=id_centro)
            validUser.save()
            #token = Token.objects.create(user=validUser) Intento de JWT
            return JsonResponse({'message': 'User created successfully', "user": validUser}, status=201)
        return JsonResponse({'error': 'Invalid data'}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        username = datos.get('username')
        password = datos.get('password')
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
    