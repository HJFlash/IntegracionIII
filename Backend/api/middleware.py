from datetime import timedelta
from django.utils.timezone import now
from django.http import JsonResponse
from .models import Usuario
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings

class TrackUsuarioActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("Middleware ejecutado")  # Esto debería aparecer en la consola si el middleware está funcionando
        print(f"Usuario en request: {request.user}")  # Verificar el usuario en la solicitud
        if hasattr(request, 'user') and request.user.is_authenticated:
            print("Usuario autenticado:", request.user.rut)  # Verificar que el usuario es autenticado
            print(f"Usuario {request.user.rut} está siendo monitoreado para inactividad.")
            user = request.user
            user.last_active = now()

            if not user.session_start:
                user.session_start = now()
                user.save()

            session_duration = now() - user.session_start
            if session_duration > timedelta(minutes=user.max_session_duration):
                user.session_start = None
                user.save()
                print(f"Sesion del usuario {request.user.rut} ha expirado.")  # Verificación
                return JsonResponse({'error': 'Sesión expiró, por favor inicie sesión nuevamente.'}, status=401)

            user.save()
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

