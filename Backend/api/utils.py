from rest_framework_simplejwt.tokens import RefreshToken

def obtener_tokens_para_usuario(usuario):
    refresh = RefreshToken.for_user(usuario)
    
    # Personalizar el payload, usando 'rut' en lugar de 'id'
    refresh['rut'] = usuario.rut

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
