from django.urls import path
from .views import registro, login_vista, logout_vista, obtener_usuario

urlpatterns = [
    path('registro/', registro, name='registro'),
    path('login/', login_vista, name='login'),
    path('logout/', logout_vista, name='logout'),
    path('usuario/', obtener_usuario, name='obtener_usuario'),
]
