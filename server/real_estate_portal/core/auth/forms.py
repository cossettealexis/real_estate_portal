from django import forms
from core.models import User
from django_countries.fields import CountryField


class UserProfileForm(forms.ModelForm):
    class Meta(object):
        model = User
        fields = ['first_name', 'last_name', 'country', 'phone_number']
