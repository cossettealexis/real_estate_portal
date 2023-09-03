from django.db import models
from core.utils import upload_to
from django.conf import settings
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
    country_code = models.CharField(max_length=5)
    phone_number = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to=upload_to, blank=True, null=True)

    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"
        db_table = "auth_user"

    def __str__(self):
        return self.get_full_name()
    
    def save(self, *args, **kwargs):
        if self.user.first_name and self.user.last_name:
            self.user.first_name = self.user.first_name.title()
            self.user.last_name = self.user.last_name.title()
            self.user.save()

        super().save(*args, **kwargs)

# def userprofile_receiver(sender, instance, created, *args, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)


# post_save.connect(userprofile_receiver, sender=User)
