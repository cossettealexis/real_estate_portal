from django.contrib import admin
from core.models import User, UserInvestorProfile


class UserAdmin(admin.ModelAdmin):
    exclude = ('password',)
    list_display = ('id', 'first_name', 'last_name', 'email')


class UserProfileAdmin(admin.ModelAdmin):
     list_display = ('user',)


admin.site.register(User, UserAdmin)
admin.site.register(UserInvestorProfile, UserProfileAdmin)
