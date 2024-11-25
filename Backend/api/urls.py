from .views import login_vista, registro, logout_vista, DatosGraficos, obtener_datos_grafico_torta, obtener_datos_grafico_barras,obtener_datos_grafico_linea, registroTrabajador  
from .views import CrearConsulta, ConsultasAgendadasViewSet, HorarioPrestadoresViewSet, ValidarDisponibilidadView  # Importamos la vista de validación
from .views import obtener_datos_soli_registro
from .views import send_email
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_vista, registro, logout_vista, DatosGraficos, obtener_datos_grafico_torta, obtener_datos_grafico_barras,obtener_datos_grafico_linea, registroTrabajador  
from .views import obtener_datos_soli_registro, ConsultasAgendadasViewSet, actualizar_estado_usuario, obtener_datos_barra_asistencia, obtener_datos_grafico_asistencia_consultorio
from .views import obtener_datos_grafico_torta_mes, obtener_datos_grafico_barras_mes, obtener_datos_grafico_asistencia_consultorio_mes
from .views import appointment_history, send_email_notification
from .views import login_vista, registro, logout_vista, PerfilUsuarioView ,ConsultasAgendadasViewSet, HorarioPrestadoresViewSet, ValidarDisponibilidadView # Importamos la vista de validación
from .views import PasswordResetRequestView, PasswordResetConfirmView
from django.views.generic import TemplateView


router = DefaultRouter()
router.register(r'consultas', ConsultasAgendadasViewSet, basename='consultas')
router.register(r'horarios', HorarioPrestadoresViewSet, basename='horarios')  # Agregamos las rutas para los horarios

urlpatterns = [
    path('registro/', registro, name='registro'),
    path('login/', login_vista, name='login'),
    path('logout/', logout_vista, name='logout'),
    path('dbgraficos/', DatosGraficos, name='dbgraficos'),
    path('obtener-datos-grafico/', obtener_datos_grafico_torta, name='obtener_datos_grafico'),
    path('obtener-datos-graficos-barra/', obtener_datos_grafico_barras, name='obtener_datos_grafico_barras'),
    path('obtener-datos-graficos-linea/', obtener_datos_grafico_linea, name='obtener_datos_grafico_linea'),
    path('registroTrabajador/', registroTrabajador, name='registroTrabajador'),
    path('obtener-datos-registro_soli/', obtener_datos_soli_registro, name='obtener_datos_soli_registro'),
    path('api/send-email/', send_email_notification, name='send-email'),
    path('actualizar-estado-usuario/<int:rut>/', actualizar_estado_usuario, name='actualizar_estado_usuario'),
    path('obtener-datos-barra-asistencia/', obtener_datos_barra_asistencia, name='obtener_datos_barra_asistencia'),
    path('obtener-datos-grafico-asistencia-consultorio/', obtener_datos_grafico_asistencia_consultorio, name='obtener_datos_grafico_asistencia_consultorio'),
    path('obtener-datos-grafico-torta-mes/', obtener_datos_grafico_torta_mes, name='obtener_datos_grafico_torta_mes'),
    path('obtener-datos-graficos-barra-mes/', obtener_datos_grafico_barras_mes, name='obtener_datos_grafico_barras_mes'),
    path('obtener-datos-grafico-asistencia-consultorio-mes/',obtener_datos_grafico_asistencia_consultorio_mes, name='obtener_datos_grafico_asistencia_consultorio_mes'),
    path('CrearConsulta/', CrearConsulta.as_view(), name='CrearConsulta'),
    path('send-email/', send_email, name='send_email'),
    path('appointment-history/', appointment_history, name='appointment_history'),
    path('api/perfil/', PerfilUsuarioView.as_view(), name='perfil-usuario'),

    # Incluir las rutas generadas por el router para las operaciones CRUD
    path('', include(router.urls)),

    path('validar-disponibilidad/', ValidarDisponibilidadView.as_view(), name='validar-disponibilidad'),
    
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    
    # Nueva ruta para la página de pausa
    path('pause/', TemplateView.as_view(template_name='index.html')),  # Requiere que el build de React esté configurado

]
