from rest_framework import serializers
from .models import Usuario

class UsuarioSerializador(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'rut',
            'primer_nombre',
            'segundo_nombre',
            'primer_apellido',
            'segundo_apellido',
            'contrasena',
            'contacto',
            'calle',
            'num_casa',
            'num_apar',
        ]

    def create(self, validated_data):
        usuario = Usuario(**validated_data)
        usuario.save()
        return usuario