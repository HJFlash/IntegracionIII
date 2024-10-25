from rest_framework import serializers
from .models import Usuario, Consultas_Agendadas

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
            'correo_electronico',
            
        ]

    def create(self, validated_data):
        usuario = Usuario(**validated_data)
        usuario.save()
        return usuario
    
class ConsultaAgendadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultas_Agendadas
        fields = ['id_consulta', 'rut_usuario', 'rut_prestador', 'fecha', 'hora_inicio', 'estado', 'servicio']

"""class HorarioPrestadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario_Prestadores
        fields = '__all__'  # O puedes especificar los campos que deseas incluir"""