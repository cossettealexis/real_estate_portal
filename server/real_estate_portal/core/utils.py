from rest_framework.authtoken.models import Token


def upload_to(instance, filename):
    """
    Handle which directory files should be saved.
    """
    return 'images/{filename}'.format(filename=filename)


def create_token_and_login(user):
    """
    Create user token. If token is created for a user, it means the user is logged in.
    """
    token, _ = Token.objects.get_or_create(user=user)
    response_data = {
        'id': user.id,
        'token': token.key,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name
    }

    return response_data
