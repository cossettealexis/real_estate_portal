# yourproject/urls.py
from django.urls import path, include

from core.bank.api.views import link_bank_with_plaid

urlpatterns = [
    path('plaid/link/', link_bank_with_plaid, name='link-bank-with-plaid'),
]
