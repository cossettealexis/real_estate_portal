from django.contrib import admin
from core.models import User


class UserAdmin(admin.ModelAdmin):
    exclude = ('password',)


admin.site.register(User, UserAdmin)
