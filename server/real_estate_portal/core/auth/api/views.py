from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError

from core.models import User
from core.utils import create_token_and_login
from core.auth.api.serializers import UserSerializer
from core.permissions import IsOwnerOrAdminOrReadOnly


@api_view(['POST'])
def register_user(request):
    """
    View for user register.
    """
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
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
