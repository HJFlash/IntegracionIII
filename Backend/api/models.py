from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Permission, User
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
    tipo_usuario = models.CharField(
        max_length=30,
        choices=[
            ("admin", "Administrador"),
            ("adultomayor", "Adulto mayor"),
            ("prestador", "Profesional")
        ],
        default="adultomayor"
    )
    
    estado_solicitud_opciones = [
        ('Pendiente', 'Pendiente'),
        ('Aceptado', 'Aceptado'),
        ('Rechazado', 'Rechazado'),
    ]
    
    estado_solicitud = models.CharField(max_length=25,choices=estado_solicitud_opciones,default='Pendiente')

class UsuarioManager(BaseUserManager):
    def create_user(self, rut, primer_nombre, primer_apellido, contacto, contrasena):
        if not rut:
            raise ValueError("El rut debe ser proporcionado")
        user = self.model(
            rut=rut,
            primer_nombre=primer_nombre,
            primer_apellido=primer_apellido,
            contacto=contacto,
        )
        if contrasena:
            user.set_password(contrasena)
        user.save(using=self._db)
        return user

    def create_superuser(self, rut, primer_nombre, primer_apellido, contacto, contrasena):
        user = self.create_user(
            rut=rut,
            primer_nombre=primer_nombre,
            primer_apellido=primer_apellido,
            contacto=contacto,
            contrasena=contrasena,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
    def get_email_field_name(self):
        return 'email'

class Usuario(AbstractBaseUser, PermissionsMixin):
    rut = models.IntegerField(unique=True, primary_key=True)
    tipo_usuario = models.CharField(
        max_length=30,
        choices=[("admin", "Administrador"), ("adultomayor", "Adulto mayor"), ("prestador", "Profesional")]
    )
    estado_solicitud = models.CharField(
        max_length=25,
        choices=[('Pendiente', 'Pendiente'), ('Aceptado', 'Aceptado'), ('Rechazado', 'Rechazado')],
        default='Pendiente'
    )
    primer_nombre = models.CharField(max_length=25, blank=True, null=True)
    segundo_nombre = models.CharField(max_length=25, blank=True, null=True)
    primer_apellido = models.CharField(max_length=25, blank=True, null=True)
    segundo_apellido = models.CharField(max_length=25, blank=True, null=True)
    contrasena = models.CharField(max_length=128, blank=True)
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    calle = models.CharField(max_length=25, default='CalleDesconocida')
    num_casa = models.CharField(max_length=50, blank=True, null=True)
    num_apar = models.CharField(max_length=50, blank=True, null=True)
    correo_electronico = models.CharField(max_length=100)
    last_login = models.DateTimeField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['primer_nombre', 'primer_apellido']
    # Nuevos campos
    last_active = models.DateTimeField(null=True, blank=True)  # Última actividad
    session_start = models.DateTimeField(null=True, blank=True)  # Inicio de sesión
    max_session_duration = models.IntegerField(default=1)  # Tiempo máximo (en minutos)

    def save(self, *args, **kwargs):
        if self.contrasena and not self.contrasena.startswith('pbkdf2_'):
            self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)

    def get_short_name(self):
        return self.nombres
    
    def get_email_field_name(self):
        return 'email'
    
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False
    
    class Meta:
        permissions = [
            ("can_view_sensitive_data", "Puede ver datos sensibles"),
        ]
    
    def save(self, *args, **kwargs):
        if self.contrasena and not self.contrasena.startswith('pbkdf2_'):  # Evitar hashear si ya está encriptada
            self.contrasena = make_password(self.contrasena)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.primer_nombre} {self.primer_apellido}'

class AdultoMayor(models.Model):
    rut = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)
    peluqueriaBloqueo = models.DateField(blank=True, null=True, default=None)
    podologiaBloqueo = models.DateField(blank=True, null=True, default=None)
    kinesiologiaBloqueo = models.DateField(blank=True, null=True, default=None)   #Hasta que fecha deben esperar para poder pedir otra hora del servicio
    psicologiaBloqueo = models.DateField(blank=True, null=True, default=None)
    asesoria_juridicaBloqueo = models.DateField(blank=True, null=True, default=None)
    fonoaudiologiaBloqueo = models.DateField(blank=True, null=True, default=None)

class Servicios(models.Model):
    nombre_servicio = models.CharField(
        max_length=50,  # Agrega max_length
        unique=True,
        primary_key=True,
        choices=[
            ("peluqueria", "Peluqueria"),
            ("podologia", "Podologia"),
            ("kinesiologia", "Kinesiologia"),
            ("psicologia", "Psicologia"),
            ("asesoria_juridica", "Asesoria Juridica"),
            ("fonoaudiologia", "Fonoaudiologia")
        ]
    )
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
    
    @staticmethod
    def traducir_dia(fecha):
        # Asegúrate de que 'fecha' sea una cadena con formato '%Y-%m-%d' o un objeto datetime
        dia_semana = datetime.strptime(fecha, '%Y-%m-%d').strftime('%A')

        # Mapa para traducir el día de la semana de inglés a español
        dias_traducidos = {
            'Monday': 'lunes',
            'Tuesday': 'martes',
            'Wednesday': 'miércoles',
            'Thursday': 'jueves',
            'Friday': 'viernes',
            'Saturday': 'sábado',
            'Sunday': 'domingo'
        }

        # Retorna el día traducido, o 'lunes' como valor por defecto si no se encuentra el día
        return dias_traducidos.get(dia_semana, 'lunes')

class Consultas_Agendadas(models.Model):
    id_consulta = models.AutoField(primary_key=True)
    rut_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)  # Cambiado a ForeignKey
    rut_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Cambiado a ForeignKey
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_termino = models.TimeField(blank=True, null=True)
    servicio = models.CharField(max_length=30, blank=True)  # Dejar opcional

    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('finalizado', 'Finalizado'),
        ('cancelado', 'Cancelado'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADOS, default='pendiente')

    def __str__(self):
        return f"{self.rut_usuario} - {self.fecha} a las {self.hora_inicio}"

class Datos_Para_Graficos(models.Model):
    id_consultas = models.AutoField(primary_key=True)
    fechas = models.DateField()
    horas = models.TimeField()
    t_consulta = models.CharField(max_length=100, blank=True, null=True)
    genero_persona = models.CharField(max_length=100, blank=True, null=True)
    asistencia = models.CharField(max_length=2,blank=True,null=True)
    consultorio = models.IntegerField(blank=True,null=True)


class Appointment(models.Model):
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    date = models.DateTimeField()
    description = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.date}"