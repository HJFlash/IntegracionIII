from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_vista, registro, logout_vista, DatosGraficos, obtener_datos_grafico_torta, obtener_datos_grafico_barras,obtener_datos_grafico_linea, registroTrabajador  
from .views import obtener_datos_soli_registro, ConsultasAgendadasViewSet, actualizar_estado_usuario

router = DefaultRouter()
router.register(r'consultas', ConsultasAgendadasViewSet, basename='consultas')
"""router.register(r'horarios', HorarioPrestadoresViewSet, basename='horarios')"""


urlpatterns = [
    path('login/', login_vista, name='login'),
    path('registro/', registro, name='registro'),
    path('logout/', logout_vista, name='logout'),
    path('dbgraficos/', DatosGraficos, name='dbgraficos'),
    path('obtener-datos-grafico/', obtener_datos_grafico_torta, name='obtener_datos_grafico'),
    path('obtener-datos-graficos-barra/', obtener_datos_grafico_barras, name='obtener_datos_grafico_barras'),
    path('obtener-datos-graficos-linea/', obtener_datos_grafico_linea, name='obtener_datos_grafico_linea'),
    path('registroTrabajador/', registroTrabajador, name='registroTrabajador'),
    path('obtener-datos-registro_soli/', obtener_datos_soli_registro, name='obtener_datos_soli_registro'),
    path('actualizar-estado-usuario/<int:rut>/', actualizar_estado_usuario, name='actualizar_estado_usuario'),

    path('',include(router.urls)),
]