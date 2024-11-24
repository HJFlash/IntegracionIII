from datetime import timedelta
from django.utils import timezone
from django.http import JsonResponse
from .models import Usuario
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings
import json

class TrackUsuarioActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        data = dict({"NADA": "NADA", "NADA": "NADA"})
        hora_local = timezone.localtime(timezone.now())
        print("Middleware ejecutado")  # Esto debería aparecer en la consola si el middleware está funcionando
        print(f"Usuario en request: {request}")  # Verificar el usuario en la solicitud
        if request.path == "/logout/":
            response = self.get_response(request)
            return response
        if request.body:
            data = json.loads(request.body)
        if list(data.keys()) == ["Rut", "Contraseña"]:
            #print(data)
            usuario = Usuario.objects.get(rut=data.get("Rut"))
            if request.path == "/login/":
                print(usuario.rut)
                #print("Usuario autenticado:", usuario.nombres, usuario.apellidos)  # Verificar que el usuario es autenticado
                #print(f"Usuario {usuario.nombres, usuario.apellidos} está siendo monitoreado para inactividad.")
                usuario.last_active = hora_local
                usuario.session_start = hora_local

                if not usuario.session_start:
                    usuario.session_start = hora_local
                    usuario.save()

        else:
            print("No hay usuario autenticado")
        response = self.get_response(request)
            
        return response


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = request.headers.get('Authorization', None)
        print(f"Authorization header: {auth}")  # Imprime el encabezado de Authorization
        if not auth:
            return None  # No hay token, por lo que no autentico a nadie

        parts = auth.split()

        if parts[0].lower() != 'bearer':
            raise AuthenticationFailed('Authorization header must start with Bearer')
        elif len(parts) == 1:
            raise AuthenticationFailed('Token missing')
        elif len(parts) > 2:
            raise AuthenticationFailed('Authorization header must be Bearer token')

        token = parts[1]

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            print(f"Token decodificado: {payload}")  # Depuración
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')
        except jwt.JWTError:
            raise AuthenticationFailed('Invalid token')

        try:
            # Aquí debe ser 'rut' y no 'user_id'
            user = Usuario.objects.get(rut=payload['rut'])  # Cambié 'user_id' por 'rut'
            print(f"Usuario encontrado: {user.rut}")  # Depuración
        except Usuario.DoesNotExist:
            raise AuthenticationFailed('User not found')

        return (user, token)


class DebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("Solicitud recibida en middleware:")
        print("Método:", request.method)
        print("Ruta:", request.path)
        print("Encabezados:", request.headers)

        response = self.get_response(request)
        return response