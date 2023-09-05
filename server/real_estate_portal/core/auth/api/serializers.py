from core.models import User, Country

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from django_countries.serializers import CountryFieldMixin
from django.contrib.auth.password_validation import validate_password


class UserSerializer(CountryFieldMixin, serializers.ModelSerializer):
    """
    Serializer for User model.
    """
    first_name = serializers.CharField(max_length=150, required=True, allow_null=False, allow_blank=False)
    last_name = serializers.CharField(max_length=150, required=True, allow_null=False, allow_blank=False)
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    country = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    phone_number = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta(object):
        model = User
        read_only_fields = (
            'id',
        )
        fields = (
            'id',
            'first_name',
            'last_name',
            'country',
            'phone_number',
            'email',
            'password',
        )

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            password=validated_data.get('password'),
            country=validated_data.get('country'),
            phone_number=validated_data.get('phone_number'),
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    

class CountrySerializer(serializers.ModelSerializer):
    phone_number_code = serializers.CharField(source='name')

    class Meta:
        model = Country
        fields = ('name', 'phone_number_code')
