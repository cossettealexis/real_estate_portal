# plaid_integration/serializers.py
from rest_framework import serializers
from core.models import PlaidToken

class PlaidTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaidToken
        fields = '__all__'
