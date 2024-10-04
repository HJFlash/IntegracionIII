from django.urls import path
from .views import login_vista, registro, logout_vista

urlpatterns = [
    path('login/', login_vista, name='login'),
    path('registro/', registro, name='registro'),
    path('logout/', logout_vista, name='logout'),
]