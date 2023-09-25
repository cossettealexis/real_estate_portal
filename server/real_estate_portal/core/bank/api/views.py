# plaid_integration/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.models import PlaidToken
from .serializers import PlaidTokenSerializer
import plaid
from django.conf import settings

@api_view(['POST'])
def link_bank_with_plaid(request):
    # Initialize Plaid client
    client = plaid.Client(
        client_id=getattr(settings, 'PLAID_CLIENT_ID'),
        secret=getattr(settings, 'PLAID_SECRET_ID'),
        environment='sandbox',  # Use 'sandbox' for testing, 'development', or 'production'
    )

    # Get Plaid public token and exchange it for an access token
    public_token = request.data.get('public_token')
    exchange_response = client.Item.public_token.exchange(public_token)

    # Save Plaid access token and other relevant data in your database
    serializer = PlaidTokenSerializer(data=exchange_response)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
