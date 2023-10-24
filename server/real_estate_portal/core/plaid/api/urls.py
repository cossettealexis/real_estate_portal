# urls.py

from django.urls import path
from .views import PlaidLinkTokenView

urlpatterns = [
    path('get_plaid_link_token/', PlaidLinkTokenView.as_view(), name='get_plaid_link_token'),
    # Add other URL patterns as needed
]
