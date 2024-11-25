from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_vista, registro, logout_vista, ConsultasAgendadasViewSet, HorarioPrestadoresViewSet, ValidarDisponibilidadView, ping  # Importamos la vista de validación
from django.views.generic import TemplateView
from .views import PasswordResetRequestView, PasswordResetView, enviar_recordatorios_api

# Crear un router para las rutas automáticas de consultas y horarios
router = DefaultRouter()
router.register(r'consultas', ConsultasAgendadasViewSet, basename='consultas')
router.register(r'horarios', HorarioPrestadoresViewSet, basename='horarios')  # Agregamos las rutas para los horarios

urlpatterns = [
    path('login/', login_vista, name='login'),
    path('registro/', registro, name='registro'),
    path('logout/', logout_vista, name='logout'),

    # Incluir las rutas generadas por el router para las operaciones CRUD
    path('', include(router.urls)),

    path('validar-disponibilidad/', ValidarDisponibilidadView.as_view(), name='validar-disponibilidad'),
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/<str:uidb64>/<str:token>/', PasswordResetView.as_view(), name='password_reset'),
    
    path('enviar-recordatorios/', enviar_recordatorios_api, name='enviar-recordatorios'),
    
    # Nueva ruta para la página de pausa
    path('pause/', TemplateView.as_view(template_name='index.html')),  # Requiere que el build de React esté configurado
    
    path('ping/', ping, name='ping') # Endpoint para manejar el ping

]
