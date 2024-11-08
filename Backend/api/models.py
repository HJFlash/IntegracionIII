from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from datetime import datetime

class Centro_Comunitario(models.Model):
    id_centro = models.IntegerField()  # max_length eliminado
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=200)

    rut = models.IntegerField(
        unique=True,
        primary_key=True
    )
    tipo_usuario = models.CharField(max_length=30,choices={
                                            "admin": "Administrador",
                                            "adultomayor": "Adulto mayor",
                                            "prestador": "Profesional"
                                                })
    
    estado_solicitud_opciones = [
        ('Pendiente', 'Pendiente'),
        ('Aceptado', 'Aceptado'),
        ('Rechazado', 'Rechazado'),
    ]
    estado_solicitud = models.CharField(max_length=25,choices=estado_solicitud_opciones,default='Pendiente')
class UsuarioManager(BaseUserManager):
    def create_user(self, rut, nombres, apellidos, contacto, contrasena=None):
        if not rut:
            raise ValueError("El rut debe ser proporcionado")
        user = self.model(
            rut=rut,
            nombres=nombres,
            apellidos=apellidos,
            contacto=contacto,
        )
        if contrasena:
            user.set_password(contrasena)
        user.save(using=self._db)
        return user

    primer_nombre = models.CharField(max_length=25, blank=True, null=True)
    segundo_nombre = models.CharField(max_length=25, blank=True, null=True)
    primer_apellido = models.CharField(max_length=25, blank=True, null=True)
    segundo_apellido = models.CharField(max_length=25, blank=True, null=True)
    contrasena = models.CharField(max_length=128, blank=True)  # Aumenta el tamaño para hashes
    def create_superuser(self, rut, nombres, apellidos, contacto, contrasena):
        user = self.create_user(
            rut=rut,
            nombres=nombres,
            apellidos=apellidos,
            contacto=contacto,
            contrasena=contrasena,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    calle = models.CharField(max_length=25, default='CalleDesconocida')
    num_casa = models.CharField(max_length=50, blank=True, null=True)
    num_apar = models.CharField(max_length=50, blank=True, null=True)
    correo_electronico = models.CharField(max_length=100)
    
    last_login = models.DateTimeField(null=True, blank=True)  # Agrega este campo
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['primer_nombre', 'primer_apellido']  # Campos requeridos
    
    class Meta:
        permissions = [
            ("can_view_sensitive_data", "Puede ver datos sensibles"),
        ]

class AdultoMayor(models.Model):
    rut = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    peluqueriaBloqueo = models.DateField(blank=True, null=True, default=None)
    podologiaBloqueo = models.DateField(blank=True, null=True, default=None)
    kinesiologiaBloqueo = models.DateField(blank=True, null=True, default=None)   #Hasta que fecha deben esperar para poder pedir otra hora del servicio
    psicologiaBloqueo = models.DateField(blank=True, null=True, default=None)
    asesoria_juridicaBloqueo = models.DateField(blank=True, null=True, default=None)
    fonoaudiologiaBloqueo = models.DateField(blank=True, null=True, default=None)

class Servicios(models.Model):
    nombre_servicio = models.CharField(unique=True, primary_key=True, choices={
                                                                    "peluqueria": "Peluqueria",
                                                                    "podologia": "Podologia",
                                                                    "kinesiologia": "Kinesiologia",
                                                                    "psicologia": "Psicologia",
                                                                    "asesoria_juridica": "Asesoria_Juridica",
                                                                    "fonoaudiologia": "Fonoaudiologia"
                                                                            })
    tiempo_atencion = models.TimeField()
    
class Prestador(models.Model):
    rut = models.IntegerField(unique=True, primary_key=True)
    servicio = models.OneToOneField(Servicios, on_delete=models.CASCADE)

class Horario_Prestadores(models.Model):
    DIAS = [
        ('lunes', 'Lunes'),
        ('martes', 'Martes'),
        ('miércoles', 'Miércoles'),
        ('jueves', 'Jueves'),
        ('viernes', 'Viernes'),
        ('sábado', 'Sábado'),
        ('domingo', 'Domingo'),
    ]

    rut_prestador = models.ForeignKey('Prestador', on_delete=models.CASCADE)
    dia = models.CharField(max_length=15, choices=DIAS)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    hora_termino = models.TimeField()
    descanso = models.TimeField()

    def clean(self):
        if not (self.hora_inicio < self.descanso < self.hora_fin):
            raise ValidationError("La hora de descanso debe estar dentro del horario laboral.")
        if self.hora_inicio >= self.hora_fin:
            raise ValidationError("La hora de inicio debe ser anterior a la hora de fin.")

    def __str__(self):
        return f"{self.rut_prestador} - {self.dia} ({self.hora_inicio} - {self.hora_termino})"

class Consultas_Agendadas(models.Model):
    id_consulta = models.AutoField(primary_key=True)
    rut_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    rut_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_termino = models.TimeField(blank=True, null=True)
    estado = models.CharField(max_length=20, default='pendiente')
    servicio = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return f"{self.rut_usuario} - {self.fecha} a las {self.hora_inicio}"

class Datos_Para_Graficos(models.Model):
    id_consultas = models.AutoField(primary_key=True)
    fechas = models.DateField()
    horas = models.TimeField()
    t_consulta = models.CharField(max_length=100, blank=True, null=True)
    genero_persona = models.CharField(max_length=100, blank=True, null=True)