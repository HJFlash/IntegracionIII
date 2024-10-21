"""
    ---------------registro----------            
        Fnombre = datos.get('Fnombre')
        Snombre = datos.get('Snombre')
        Fapellido = datos.get('Fapellido')
        Sapellido = datos.get('Sapellido') 
        
        
        if rut and Fnombre and Fapellido:
        
        validUser = Usuario(rut=rut, Fnombre=Fnombre, Snombre=Snombre, Fapellido=Fapellido, Sapellido=Sapellido, contrasena=contrasena, contacto=contacto, calle=calle, num_casa=num_casa, num_apar=num_apar, id_centro=id_centro)
"""

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json

from .models import Usuario, Consultas_Agendadas
from django.contrib.auth.hashers import check_password, make_password
from .serializers import UsuarioSerializador
from .utils import obtener_tokens_para_usuario
from django.contrib.auth.hashers import check_password
from django.contrib.auth import logout  # Asegúrate de que esta línea esté presente
from django.http import JsonResponse

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)  # Cerrar sesión
        return JsonResponse({'message': 'Cierre de sesión exitoso'}, status=200)


# Decorador para verificar si el usuario tiene permiso para ver datos sensibles
def has_permission_to_view_sensitive_data(user):
    return user.has_perm('api.can_view_sensitive_data')  # Cambia 'api' por el nombre de tu aplicación

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def vista_protegida(request):
    return JsonResponse({'message': 'Acceso permitido porque el token es válido.'}, status=200)

@csrf_exempt
def registro(request):
    def validarRut(rut):
        listed_rut = [int(n) for n in str(rut)]
        #######
        if (len(listed_rut) == 5):  # Si queremos meter usuarios de prueba hagamoslo con ruts de 5 numeros ### DELETEAR EN EL FUTURO ###
            return True
        #######
        if (len(listed_rut) < 8 or len(listed_rut) > 9): # Tiene que tener entre 8 y 9 digitos
            return False
        reversed_rut = listed_rut[::-1]
        dig_verificador = reversed_rut.pop(0)
        multiplicator = 2
        suma = 0
        while (len(reversed_rut) > 0):
            for x in range(0, len(listed_rut) - 1):
                suma += multiplicator * reversed_rut.pop(0)  
                multiplicator += 1
                if (multiplicator == 8):
                    multiplicator = 2
        resto = suma % 11
        if resto == 1 or resto == 0:
            resto = 11
        if (11 - resto == dig_verificador):
            return True
        else:
            return False

    if request.method == 'POST':
        datos = json.loads(request.body)
        
        serializer = UsuarioSerializador(data=datos)

        if serializer.is_valid():

            if not validarRut(serializer.validated_data['rut']) and serializer.validated_data['rut'] < 2000000:
                return JsonResponse({'error': 'Este rut no es valido'}, status=400)
            # Verificar si el RUT ya existe
            if Usuario.objects.filter(rut=serializer.validated_data['rut']).exists():
                return JsonResponse({'error': 'El rut ya existe'}, status=400)
            
            # Crear y guardar el nuevo usuario
            serializer.save()  # Llama a la función create del serializer

            return JsonResponse({'message': 'Usuario creado exitosamente'}, status=201)
        
        return JsonResponse({'error': serializer.errors}, status=400)

@csrf_exempt
def login_vista(request):
    if request.method == 'POST':
        datos = json.loads(request.body)
        rut = datos.get('Rut')  # Autenticación basada en el rut
        contrasena = datos.get('Contraseña')
        
        try:
            usuario = Usuario.objects.get(rut=rut)

            # Verificar la contraseña
            if check_password(contrasena, usuario.contrasena):
                tokens = obtener_tokens_para_usuario(usuario)
                return JsonResponse({
                    'message': 'Inicio de sesión exitoso',
                    'refresh': tokens['refresh'],
                    'access': tokens['access']
                }, status=200)
            else:
                return JsonResponse({'error': 'Credenciales inválidas'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

@csrf_exempt
def logout_vista(request):
    if request.method == 'POST':
        logout(request)  # Cerrar sesión
        return JsonResponse({'message': 'Cierre de sesión exitoso'}, status=200)
    
from .models import Datos_Para_Graficos
from django.db.models import Count, Case, When, IntegerField, Value
from django.db.models.functions import ExtractMonth, TruncMonth


@csrf_exempt
def DatosGraficos(request):
    if request.method == 'POST':
        try:
            # Cargar los datos del cuerpo de la solicitud
            datos = json.loads(request.body)
            print(datos)
            
            # Extraer datos del cuerpo de la solicitud
            fechas = datos.get('fechas')
            horas = datos.get('horas')
            t_consulta = datos.get('t_consulta')
            genero_persona = datos.get('genero_persona')
            
            # Verificar que los datos obligatorios están presentes
            if not (fechas and horas and genero_persona):
                return JsonResponse({'error': 'Faltan campos obligatorios'}, status=400)
            
            # Crear y guardar la nueva instancia de Datos_Para_Graficos
            nueva_dato = Datos_Para_Graficos.objects.create(
                fechas=fechas,
                horas=horas,
                t_consulta=t_consulta,
                genero_persona=genero_persona
            )

            # Retornar una respuesta exitosa con el id de la nueva instancia
            return JsonResponse({'mensaje': 'Dato creado con éxito', 'id': nueva_dato.id_consultas}, status=201)
        
        except Exception as e:
            # Manejar errores y retornar una respuesta de error
            return JsonResponse({'error': str(e)}, status=500)
    
    # Si no es un método POST, devolver error
    return JsonResponse({'error': 'Método no permitido'}, status=405)



def obtener_datos_grafico_torta(request):
    datos = Datos_Para_Graficos.objects.values('t_consulta').annotate(cantidad=Count('t_consulta'))
    return JsonResponse(list(datos), safe=False)


def obtener_datos_grafico_barras(request):
    datos = Datos_Para_Graficos.objects.values('t_consulta').annotate(
        hombres=Count(Case(When(genero_persona='m', then=1))),
        mujeres=Count(Case(When(genero_persona='f', then=1)))
    )
    return JsonResponse(list(datos), safe=False)
    

def obtener_datos_grafico_linea(request):
    datos_hombres = (
        Datos_Para_Graficos.objects.filter(genero_persona='m')
        .annotate(mes=TruncMonth('fechas'))
        .values('mes')
        .annotate(cantidad_solicitudes=Count('id_consultas'))
        .order_by('mes')
    )

    datos_mujeres = (
        Datos_Para_Graficos.objects.filter(genero_persona='f')
        .annotate(mes=TruncMonth('fechas'))
        .values('mes')
        .annotate(cantidad_solicitudes=Count('id_consultas'))
        .order_by('mes')
    )


    meses_nombres = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]


    datos_finales = {mes: {'hombres': 0, 'mujeres': 0} for mes in meses_nombres}


    for dato in datos_hombres:
        mes_num = dato['mes'].month 
        datos_finales[meses_nombres[mes_num - 1]]['hombres'] = dato['cantidad_solicitudes']


    for dato in datos_mujeres:
        mes_num = dato['mes'].month
        datos_finales[meses_nombres[mes_num - 1]]['mujeres'] = dato['cantidad_solicitudes']

    respuesta_final = []
    for mes, conteo in datos_finales.items():
        respuesta_final.append({
            'mes': mes,
            'cantidad_hombres': conteo['hombres'],
            'cantidad_mujeres': conteo['mujeres']
        })

    return JsonResponse(respuesta_final, safe=False)

from .models import Prestador, Usuario

@csrf_exempt
def registroTrabajador(request):
    if request.method == 'POST':
        try:
            # Cargar los datos del cuerpo de la solicitud
            datos = json.loads(request.body)
            print(datos)
            
            # Extraer datos del cuerpo de la solicitud
            rut = datos.get('rut')
            primer_nombre = datos.get('primer_nombre')
            segundo_nombre = datos.get('segundo_nombre')
            primer_apellido = datos.get('primer_apellido')
            segundo_apellido = datos.get('segundo_apellido')
            contrasena = datos.get('contrasena')
            contacto = datos.get('contacto')
            servicio = datos.get('servicio')
            calle = datos.get('calle')
            num_casa = datos.get('num_casa')
            num_apar = datos.get('num_apar')
    
            # Crear y guardar la nueva instancia de 
            nueva_datos = Prestador.objects.create(
                rut=rut,
                primer_nombre=primer_nombre,
                segundo_nombre=segundo_nombre,
                primer_apellido=primer_apellido,
                segundo_apellido=segundo_apellido,
                contrasena=contrasena,
                contacto=contacto,
                servicio=servicio,
                calle=calle,
                num_casa=num_casa,
                num_apar=num_apar,
            )
            return JsonResponse({'mensaje': 'Dato creado con éxito', 'id': nueva_datos.rut}, status=201)

        except Exception as e:
            # Manejar errores y retornar una respuesta de error
            return JsonResponse({'error': str(e)}, status=500)
    
    # Si no es un método POST, devolver error
    return JsonResponse({'error': 'Método no permitido'}, status=405)

def obtener_datos_soli_registro(request):
    datos = Usuario.objects.values()
    return JsonResponse(list(datos), safe=False)