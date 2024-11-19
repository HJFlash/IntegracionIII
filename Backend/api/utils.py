from rest_framework_simplejwt.tokens import RefreshToken

def obtener_tokens_para_usuario(usuario):
    refresh = RefreshToken.for_user(usuario)
    
    # Personalizar el payload, usando 'rut' en lugar de 'id'
    refresh['rut'] = usuario.rut

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
from django.core.mail import send_mail

def send_notification_email(to_email, subject, message):
    send_mail(
        subject,
        message,
        'tu_correo@gmail.com',  # Correo desde donde se enviará
        [to_email],            # Destinatarios
        fail_silently=False,
    )

