from django.contrib import admin
from core.models import User, UserInvestorProfile


class UserAdmin(admin.ModelAdmin):
    exclude = ('password',)


admin.site.register(User, UserAdmin)
admin.site.register(UserInvestorProfile)
