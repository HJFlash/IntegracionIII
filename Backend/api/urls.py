from .views import login_vista, registro, logout_vista, DatosGraficos, obtener_datos_grafico_torta, obtener_datos_grafico_barras,obtener_datos_grafico_linea, registroTrabajador  
from .views import login_vista, registro, logout_vista, ConsultasAgendadasViewSet, HorarioPrestadoresViewSet, ValidarDisponibilidadView  # Importamos la vista de validación
from .views import obtener_datos_soli_registro, ConsultasAgendadasViewSet
from django.urls import path, include

# Crear un router para las rutas automáticas de consultas y horarios
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

    path('',include(router.urls)),
]
