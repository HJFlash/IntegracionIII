from django.db import models
# Create your models here.

class Centro_Comunitario(models.Model):
    id_centro = models.IntegerField(max_length=8)
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=200)

class Usuario(models.Model):
    rut = models.IntegerField(max_length=8, unique=True, primary_key=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    contrasena = models.CharField(max_length=25)
    contacto = models.IntegerField(max_length=15, unique=True)
    calle = models.CharField(max_length=25)
    num_casa = models.CharField(max_length=50)
    num_apar = models.CharField(max_length=50, blank=True)
    id_centro = models.ForeignKey(Centro_Comunitario, on_delete=models.CASCADE)

class Prestador(models.Model):
    rut = models.IntegerField(max_length=8, unique=True, primary_key=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    contrasena = models.CharField(max_length=25)
    contacto = models.IntegerField(max_length=15, unique=True)
    servicio = models.CharField(max_length=30)
    calle = models.CharField(max_length=25)
    num_casa = models.CharField(max_length=50)
    num_apar = models.CharField(max_length=50, blank=True)

class Horario_Prestadores():
    rut_prestador = models.OneToOneField(Prestador, on_delete=models.CASCADE)
    descanso = models.TimeField()
    hora_inicio = models.TimeField()
    hora_termino = models.TimeField()

class Consultas_Agendadas():
    id_consulta = models.IntegerField(max_length=8, unique=True, primary_key=True)
    servicio = models.CharField(max_length=30)
    rut_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    rut_ususario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_termino = models.TimeField()

class Admin():
    rut = models.IntegerField(max_length=8, unique=True, primary_key=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    contacto = models.IntegerField(max_length=15, unique=True)
    direccion = models.CharField(max_length=150)