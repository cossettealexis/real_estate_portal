from django.db import models
from core.utils import upload_to
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    country = models.CharField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True, help_text="Include the international country code, e.g., +1 for USA, +44 for UK, +81 for Japan, etc.")

    objects = CustomUserManager()

    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"
        db_table = "auth_user"

    def __str__(self):
        return self.get_full_name() or self.email
    
    def save(self, *args, **kwargs):
        if self.first_name and self.last_name:
            self.first_name = self.first_name.title()
            self.last_name = self.last_name.title()

        super().save(*args, **kwargs)


class UserInvestorProfile(models.Model):
    CITIZENSHIP_CHOICES = (
        ('us_citizen', 'U.S. Citizen'),
        ('us_resident', 'U.S. Resident'),
        ('non_us_citizen', 'Non U.S. Citizen or Resident'),
    )

    ACCOUNT_TYPES = (
        ('individual', 'Individual'),
        ('entity', 'Entity'),
    )

    user = models.OneToOneField(
        User,
        verbose_name="User",
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        db_column="user_id",
    )
    apartment_or_suite = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=50, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    same_as_home = models.BooleanField(default=True)

    citizenship = models.CharField(
        'Citizenship',
        max_length=15,
        choices=CITIZENSHIP_CHOICES,
        blank=True,
        null=True,
    )

    account_type = models.CharField(
        max_length=20,
        choices=ACCOUNT_TYPES,
        default='individual',
    )


    class Meta(object):
        db_table = "user_investor_profile"

    def __str__(self):
        return self.user.get_full_name() or self.user.email
    
    def save(self, *args, **kwargs):
        if self.user.first_name and self.user.last_name:
            self.user.first_name = self.user.first_name.title()
            self.user.last_name = self.user.last_name.title()
            self.user.save()

        super().save(*args, **kwargs)


def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        UserInvestorProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=User)

class Country(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=5)
