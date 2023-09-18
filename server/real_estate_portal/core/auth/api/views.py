from rest_framework import status, permissions, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView

from core.models import User, Country
from core.utils import create_token_and_login, is_valid_phone_number_format
from core.auth.api.serializers import UserSerializer, CountrySerializer
from core.permissions import IsOwnerOrAdminOrReadOnly

import phonenumbers


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    http_method_names = [
        'get',
    ]
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrAdminOrReadOnly,)


@api_view(['POST'])
def register_user(request):
    """
    View for user register.
    """
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        country_code = request.data.get('country_code')
        phone_number = request.data.get('phone_number')

        if not is_valid_phone_number_format(country_code, phone_number):
            return Response({'error': 'Invalid phone number format for the selected country code.'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            user = serializer.save()

            response_data = create_token_and_login(user)
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not email:
            raise ValidationError("Email cannot be blank.")
        
        if not password:
            raise ValidationError("Password cannot be blank.")

        user = None
        if '@' in email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                pass
        else:
            raise ValidationError("Please enter a valid email address.")

        if user and user.check_password(password):
            response_data = create_token_and_login(user)
            return Response(response_data, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            # Delete the user's token to logout
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsOwnerOrAdminOrReadOnly])
def delete_user(request):
    try:
        user = User.objects.get(id=request.user.pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

    
    if not request.user.is_staff and user != request.user:
        return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        user.delete()
        return Response({'message': 'User deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user_profile(request, user_id):
    try:
        user_profile = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    if user_profile != request.user:
        return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = UserSerializer(user_profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CountryViewSet(ListAPIView):
    queryset = Country.objects.all()

    def get(self, request, *args, **kwargs):
        countries = self.queryset.all()

        for country in countries:
            country.phone_number_code = phonenumbers.country_code(country.name)

        serializer = CountrySerializer(countries, many=True)

        return Response(serializer.data)
