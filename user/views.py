from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import Client

# Create your views here.


@login_required
def settings(request):
    if request.method == 'GET':
        return render(request, 'settings.html')

    elif request.method == 'POST':
        user = User.objects.get(id=request.user.id)
        user.username = request.POST['username']
        user.first_name = request.POST['firstName']
        user.last_name = request.POST['lastName']
        user.email = request.POST['email']
        user.save()

        try:
            client = Client.objects.get(id=request.user.id)
            client.username = request.POST['email']
            client.email = request.POST['email']
            client.binance_key = request.POST['binanceKey']
            client.binance_secret_key = request.POST['binanceSecretKey']
            client.save()
            msg = "Changes Saved Successfully. Please refresh"

        # Adding entry to Client table temporary, will change when registeration will be implemented
        except Client.DoesNotExist:
            client = Client.objects.create(id=request.user.id, username=request.POST['username'], email=request.POST['email'])
            client.binance_key = request.POST['binanceKey']
            client.binance_secret_key = request.POST['binanceSecretKey']
            client.save()
            msg = "Changes Saved Successfully. Please refresh"
        except Exception as e:
            msg = e

        return render(request, 'settings.html', {"msg": msg})


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


@login_required
def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        return redirect('/')
