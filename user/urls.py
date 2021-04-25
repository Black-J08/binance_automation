from django.urls import path
from . import views

urlpatterns = [
    path('settings/', views.settings),
    path('login/', views.login),
    path('logout/', views.logout),
]
