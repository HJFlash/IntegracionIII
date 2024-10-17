from rest_framework import serializers
from .models import Usuario, Consultas_Agendadas, Horario_Prestadores

class UsuarioSerializador(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['rut', 'Fnombre', 'Snombre', 'Fapellido', 'Sapellido', 'contrasena', 'contacto', 'num_casa', 'num_apar', 'id_centro']
        # Serializador para Consultas Agendadas
        
class ConsultaAgendadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultas_Agendadas
        fields = ['id_consulta', 'rut_usuario', 'rut_prestador', 'fecha', 'hora_inicio', 'estado', 'servicio']

class HorarioPrestadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horario_Prestadores
        fields = '__all__'  # O puedes especificar los campos que deseas incluir
