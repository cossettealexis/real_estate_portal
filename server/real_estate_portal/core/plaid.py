import plaid
from django.conf import settings


client = plaid.Client(
    client_id=settings.PLAID_CLIENT_ID,
    secret=settings.PLAID_SECRET,
    environment=settings.PLAID_PUBLIC_KEY,  # Change to 'development' or 'production' as needed
)