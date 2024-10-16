from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Permission

class Centro_Comunitario(models.Model):
    id_centro = models.IntegerField()  # max_length eliminado
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=200)

"""    
    Fnombre = models.CharField(max_length=100, blank=True, null=True)
    Snombre = models.CharField(max_length=100, default='ApellidoDesconocido')
    Fapellido = models.CharField(max_length=100, blank=True, null=True)
    Sapellido = models.CharField(max_length=100, default='ApellidoDesconocido')
""" 

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

    
class Usuario(models.Model):
    
    is_active = models.BooleanField(default=True)  # Agrega este campo
    
    def __str__(self):
        return f'{self.nombres} {self.apellidos}'  # Cambia nombres por Fnombre

    rut = models.IntegerField(
        unique=True,
        primary_key=True,
        validators=[
            MaxValueValidator(999999999),
            MinValueValidator(10000000)
        ]
    )

    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, default='ApellidoDesconocido')
    contrasena = models.CharField(max_length=128, blank=True)  # Aumenta el tamaño para hashes
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    calle = models.CharField(max_length=25, default='CalleDesconocida')
    num_casa = models.CharField(max_length=50, blank=True, null=True)
    num_apar = models.CharField(max_length=50, blank=True, null=True)
    #id_centro = models.ForeignKey(Centro_Comunitario, on_delete=models.CASCADE, null=True, blank=True)
    

    last_login = models.DateTimeField(null=True, blank=True)  # Agrega este campo

    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['nombres', 'apellidos']  # Campos requeridos
    
    def __str__(self):
        return f'{self.nombres} {self.apellidos}'

    # Métodos requeridos
    def get_full_name(self):
        return f'{self.nombres} {self.apellidos}'

    def get_short_name(self):
        return self.nombres

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


class Horario_Prestadores(models.Model):
    rut_prestador = models.OneToOneField(Prestador, on_delete=models.CASCADE)
    descanso = models.TimeField()
    hora_inicio = models.TimeField()
    hora_termino = models.TimeField()


class Consultas_Agendadas(models.Model):
    id_consulta = models.AutoField(primary_key=True)
    rut_prestador = models.ForeignKey(Prestador, on_delete=models.CASCADE)
    rut_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    estado = models.CharField(max_length=20, default='pendiente')  # Nuevo campo agregado
    # hora_termino = models.TimeField() //hora termino siempre sera la misma dependiendo del servicio y hora de inicio


class Admin(models.Model):
    rut = models.IntegerField(unique=True, primary_key=True)
    nombres = models.CharField(max_length=100, blank=True, null=True)
    apellidos = models.CharField(max_length=100, default='ApellidoDesconocido')
    contacto = models.CharField(max_length=20, unique=True, default="Sin contacto")
    direccion = models.CharField(max_length=150)
