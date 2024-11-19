from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_vista, registro, logout_vista, ConsultasAgendadasViewSet, HorarioPrestadoresViewSet, ValidarDisponibilidadView, ping  # Importamos la vista de validación
from .views import PasswordResetRequestView, PasswordResetConfirmView
from django.views.generic import TemplateView

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
    
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    
    # Nueva ruta para la página de pausa
    path('pause/', TemplateView.as_view(template_name='index.html')),  # Requiere que el build de React esté configurado
    
    path('ping/', ping, name='ping') # Endpoint para manejar el ping

]
