from django.contrib import auth
from django.shortcuts import render, redirect

# Create your views here.


def login(request):
    if request.method == 'POST':
        username = request.POST['login_user']
        password = request.POST['login_password']
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            pass
    else:
        return render(request, 'login.html')


def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        return redirect('/')
