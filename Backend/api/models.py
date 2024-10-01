from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Centro_Comunitario(models.Model):
    id_centro = models.IntegerField()  # max_length eliminado
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=200)

class Usuario(models.Model):
    rut = models.IntegerField(
        unique=True,
        primary_key=True,
        validators=[
            MaxValueValidator(999999999),
            MinValueValidator(10000000)
        ]
    )
    Fnombre = models.CharField(max_length=100, blank=True, null=True)
    Snombre = models.CharField(max_length=100, default='ApellidoDesconocido')
    Fapellido = models.CharField(max_length=100, blank=True, null=True)
    Sapellido = models.CharField(max_length=100, default='ApellidoDesconocido')
    contrasena = models.CharField(max_length=25, blank=True)
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    calle = models.CharField(max_length=25, default='CalleDesconocida')
    num_casa = models.CharField(max_length=50, blank=True, null=True)
    num_apar = models.CharField(max_length=50, blank=True, null=True)
    id_centro = models.ForeignKey(Centro_Comunitario, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.nombres
    
class Prestador(models.Model):
    rut = models.IntegerField(unique=True, primary_key=True)  # Sin valor por defecto
    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, default='ApellidoDesconocido')
    contrasena = models.CharField(max_length=25, blank=True)
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    servicio = models.CharField(max_length=30)
    calle = models.CharField(max_length=25, default='CalleDesconocida')
    num_casa = models.CharField(max_length=50)
    num_apar = models.CharField(max_length=50, blank=True)

class Horario_Prestadores(models.Model):
    rut_prestador = models.OneToOneField(Prestador, on_delete=models.CASCADE)
    descanso = models.TimeField()
    hora_inicio = models.TimeField()
    hora_termino = models.TimeField()

class Consultas_Agendadas(models.Model):
    id_consulta = models.AutoField(primary_key=True)
    servicio = models.CharField(max_length=30)
    rut_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    rut_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Corregido el nombre del campo
    fecha = models.DateField()
    hora_inicio = models.TimeField()
#    hora_termino = models.TimeField() //hora termino siempre sera la misma dependiendo del servicio y hora de inicio

class Admin(models.Model):
    rut = models.IntegerField(unique=True, primary_key=True)
    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, default='ApellidoDesconocido')
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    direccion = models.CharField(max_length=150)
