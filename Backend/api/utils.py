from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from .models import Prestador, Horario_Prestadores
from django.contrib.auth.tokens import PasswordResetTokenGenerator

def obtener_tokens_para_usuario(usuario):
    refresh = RefreshToken.for_user(usuario)
    
    # Personalizar el payload, usando 'rut' en lugar de 'id'
    refresh['rut'] = usuario.rut

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def send_notification_email(to_email, subject, message):
    send_mail(
        subject,
        message,
        'tu_correo@gmail.com',  # Correo desde donde se enviará
        [to_email],            # Destinatarios
        fail_silently=False,
    )

def validar_disponibilidad(servicio, fecha, hora_inicio):
    try:
        # Obtener el prestador para el servicio solicitado
        prestadores_disponibles = Prestador.objects.filter(servicio__nombre_servicio=servicio)
        if not prestadores_disponibles:
            return {"error": "No hay prestadores disponibles para el servicio seleccionado."}

        # Traducir la fecha al día de la semana en español
        dia_semana = Horario_Prestadores.traducir_dia(fecha)

        # Buscar un prestador disponible en el horario
        for prestador in prestadores_disponibles:
            horarios = Horario_Prestadores.objects.filter(rut_prestador=prestador, dia=dia_semana)

            for horario in horarios:
                # Verificar si la hora de inicio está dentro del horario disponible, sin contar el descanso
                if (horario.hora_inicio <= hora_inicio < horario.hora_termino) and (
                    hora_inicio < horario.descanso or hora_inicio >= horario.hora_termino):
                    return {"prestador": prestador}  # Se encontró un prestador disponible

        return {"error": "No hay prestadores disponibles para el servicio y horario seleccionados."}
    except Exception as e:
        return {"error": f"Error al validar disponibilidad: {str(e)}"}

class AccountRecoveryTokenGenerator(PasswordResetTokenGenerator):
    pass

account_recovery_token = AccountRecoveryTokenGenerator()