from core.models import Document, User, Country, UserInvestorProfile
from rest_framework.authtoken.models import Token

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from django_countries.serializers import CountryFieldMixin
from django.contrib.auth.password_validation import validate_password

from core.document.api.serializers import DocumentSerializer


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
    token = serializers.SerializerMethodField(read_only=True)

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
            'token',
        )

    def get_token(self, obj):
        try:
            return Token.objects.get(user=obj).key
        except Token.DoesNotExist:
            return None

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


class UserInvestorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    files = serializers.SerializerMethodField()

    class Meta:
        model = UserInvestorProfile
        read_only_fields = (
            'id',
        )
        fields = (
            'id',
            'user',
            'apartment_or_suite',
            'city',
            'state',
            'postal_code',
            'citizenship',
            'mailing_apartment_or_suite',
            'mailing_city',
            'mailing_state',
            'mailing_postal_code',
            'citizenship',
            'account_type',
            'birthdate',
            'ssn',
            'networth',
            'files',
        )

    def get_files(self, obj):
        documents = Document.objects.filter(user=obj)
        return DocumentSerializer(documents, many=True).data


class CountrySerializer(serializers.ModelSerializer):
    phone_number_code = serializers.CharField(source='name')

    class Meta:
        model = Country
        fields = ('name', 'phone_number_code')
