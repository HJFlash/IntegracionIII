from rest_framework import serializers
from .models import Usuario

class UsuarioSerializador(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['rut', 'Fnombre', 'Snombre', 'Fapellido', 'Sapellido', 'contrasena', 'contacto', 'num_casa', 'num_apar', 'id_centro']