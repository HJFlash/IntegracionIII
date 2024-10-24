from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Permission

class Centro_Comunitario(models.Model):
    id_centro = models.IntegerField()  # max_length eliminado
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=200)
    
class Usuario(models.Model):
    
    def __str__(self):
        return f'{self.primer_nombre}{self.segundo_nombre}{self.primer_apellido}{self.segundo_apellido}'

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

    primer_nombre = models.CharField(max_length=25, blank=True, null=True)
    segundo_nombre = models.CharField(max_length=25, blank=True, null=True)
    primer_apellido = models.CharField(max_length=25, blank=True, null=True)
    segundo_apellido = models.CharField(max_length=25, blank=True, null=True)
    contrasena = models.CharField(max_length=128, blank=True)  # Aumenta el tamaño para hashes
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    calle = models.CharField(max_length=25, default='CalleDesconocida')
    num_casa = models.CharField(max_length=50, blank=True, null=True)
    num_apar = models.CharField(max_length=50, blank=True, null=True)
    admin = models.BooleanField(default=False)
    correo_electronico = models.CharField(max_length=100)
    
    last_login = models.DateTimeField(null=True, blank=True)  # Agrega este campo

    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido']  # Campos requeridos
    
    class Meta:
        permissions = [
            ("can_view_sensitive_data", "Puede ver datos sensibles"),
        ]
    
    def save(self, *args, **kwargs):
        if self.contrasena and not self.contrasena.startswith('pbkdf2_'):  # Evitar hashear si ya está encriptada
            self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)

class AdultoMayor(models.Model):
    rut = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    peluqueriaBloqueo = models.DateField()
    podologiaBloqueo = models.DateField()
    kinesiologiaBloqueo = models.DateField()   #Hasta que fecha deben esperar para poder pedir otra hora del servicio
    psicologiaBloqueo = models.DateField()
    asesoria_juridicaBloqueo = models.DateField()
    fonoaudiologiaBloqueo = models.DateField()

class Prestador(models.Model):
    rut = models.IntegerField(unique=True, primary_key=True)
    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, default='ApellidoDesconocido')
    contrasena = models.CharField(max_length=128, blank=True)  # Aumenta el tamaño para hashes
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    servicio = models.CharField(max_length=30)
    calle = models.CharField(max_length=25, default='CalleDesconocida')
    num_casa = models.CharField(max_length=50)
    num_apar = models.CharField(max_length=50, blank=True)
    
    def save(self, *args, **kwargs):
        if self.contrasena and not self.contrasena.startswith('pbkdf2_'):  # Evitar hashear si ya está encriptada
            self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)


class Consultas_Agendadas(models.Model):
    id_consulta = models.AutoField(primary_key=True)
    rut_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    rut_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_termino = models.TimeField(blank=True, null=True)  # Calculado al guardar
    estado = models.CharField(max_length=20, default='pendiente')
    servicio = models.CharField(max_length=30, blank=True)  # Dejar opcional

    def __str__(self):
        return f"{self.rut_usuario} - {self.fecha} a las {self.hora_inicio}"


"""class Admin(models.Model):
    rut = models.IntegerField(unique=True, primary_key=True)
    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, default='ApellidoDesconocido')
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    direccion = models.CharField(max_length=150)"""

class Datos_Para_Graficos(models.Model):
    id_consultas = models.AutoField(primary_key=True)
    fechas = models.DateField()
    horas = models.TimeField()
    t_consulta = models.CharField(max_length=100, blank=True, null=True)
    genero_persona = models.CharField(max_length=100, blank=True, null=True)

    