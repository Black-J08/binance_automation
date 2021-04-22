from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Create your views here.


@login_required
def dashboard(request):
    return render(request, 'dashboard.html', {'page': 'dashboard', 'amountBTC': '0.001', 'amountUSDT': '12'})
    #using temporary variables representing user's wallet portfolio
