from django.db import models

# Create your models here.


class Client(models.Model):
    uid = models.UUIDField(primary_key=True)
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=254)
    binance_key = models.CharField(max_length=64, blank=True)
    binance_secret_key = models.CharField(max_length=64, blank=True)
