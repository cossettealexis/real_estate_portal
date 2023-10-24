# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import plaid

class PlaidLinkTokenView(APIView):
    def get(self, request):
        # Initialize Plaid client with your credentials
        try:
            client = plaid.Client(
                client_id=settings.PLAID_CLIENT_ID,
                secret=settings.PLAID_SECRET,
                environment=settings.PLAID_PUBLIC_KEY,  # Change to 'development' or 'production' as needed
            )

            # Generate a Plaid Link token
            response = client.LinkToken.create(
                {
                    'user': {
                        'client_user_id': 'unique_user_id',  # Customize this as needed
                    },
                    'products': ['auth', 'transactions'],  # Customize products as needed
                    'country_codes': ['US'],  # Customize country codes as needed
                    'language': 'en',
                }
            )

            link_token = response['link_token']
            return Response({'link_token': link_token}, status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
