from rest_framework import serializers
from django.contrib.auth.hashers import make_password  # Importa make_password
from .models import Usuario

class UsuarioSerializador(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'rut',
            'Fnombre',
            'Snombre',
            'Fapellido',
            'Sapellido',
            'contrasena',
            'contacto',
            'calle',
            'num_casa',
            'num_apar',
            'id_centro'  # Asegúrate de que este campo también esté en tu modelo
        ]

    def create(self, validated_data):
        # Encriptar la contraseña antes de guardar
        validated_data['contrasena'] = make_password(validated_data['contrasena'])
        return super().create(validated_data)