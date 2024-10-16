from django.urls import path
from .views import login_vista, registro, logout_vista,  DatosGraficos, obtener_datos_grafico, registroTrabajador  

urlpatterns = [
    path('login/', login_vista, name='login'),
    path('registro/', registro, name='registro'),
    path('logout/', logout_vista, name='logout'),
    path('dbgraficos/', DatosGraficos, name='dbgraficos'),
    path('obtener-datos-grafico/', obtener_datos_grafico, name='obtener_datos_grafico'),
    path('registroTrabajador/', registroTrabajador, name='registroTrabajador'),
]