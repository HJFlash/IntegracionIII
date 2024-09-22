from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
        if rut and password and email and nombre and apellidos and telefono and sector and calle and ncasa:
            if User.objects.filter(username=rut).exists():  # Usamos RUT como nombre de usuario
                return JsonResponse({'error': 'El RUT ya está registrado'}, status=400)
            
            # Crear el usuario usando el RUT como nombre de usuario
            usuario = User.objects.create_user(username=rut, password=password, email=email)

            # Guardar información adicional en el perfil del usuario
            usuario.first_name = nombre
            usuario.last_name = apellidos
            usuario.save()

            # Aquí podrías almacenar más datos en un perfil de usuario personalizado si es necesario

            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)

        return JsonResponse({'error': 'Datos inválidos'}, status=400)


@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('Rut')  # Usamos RUT en lugar de nombre de usuario
        password = datos.get('Contraseña')
        usuario = authenticate(username=rut, password=password)
        if usuario is not None and usuario.is_active:
            login(request, usuario)
            return JsonResponse({'message': 'Inicio de sesión exitoso'})
        return JsonResponse({'error': 'Credenciales inválidas'}, status=401)


@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Desconexión exitosa'})