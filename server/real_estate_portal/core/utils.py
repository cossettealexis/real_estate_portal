import phonenumbers
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
        'last_name': user.last_name,
        'country': user.country,
        'phone_number': user.phone_number,
    }

    return response_data


def is_valid_phone_number_format(country_code, phone_number):
    """
    Checks if phone number corresponds to the country code.
    """
    if country_code and phone_number:
        try:
        # Construct the full phone number with the country code
            full_phone_number = f"{country_code}{phone_number}"
            
            # Parse the phone number
            parsed_phone_number = phonenumbers.parse(full_phone_number, None)

            # Check if the phone number is valid for the selected country
            return (
                phonenumbers.is_valid_number(parsed_phone_number) and
                phonenumbers.is_possible_number(parsed_phone_number)
            )
        except phonenumbers.phonenumberutil.NumberParseException:
                return False
    else:
      return True

