from core.models import User

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
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
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user
