from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_vista, registro, logout_vista, ConsultasAgendadasViewSet

# Crear un router para las rutas automáticas de las citas
router = DefaultRouter()
router.register(r'consultas', ConsultasAgendadasViewSet, basename='consultas')

urlpatterns = [
    path('login/', login_vista, name='login'),
    path('registro/', registro, name='registro'),
    path('logout/', logout_vista, name='logout'),

    # Incluir las rutas generadas por el router para las operaciones CRUD
    path('', include(router.urls)),  
]
