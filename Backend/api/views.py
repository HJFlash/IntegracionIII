from django.shortcuts import render
from django.http import HttpResponse

def api(request):
    return HttpResponse("nasheeeeeee")
# Create your views here.

def login(request):
    return HttpResponse("<h1>Pagina de login<h1>")
