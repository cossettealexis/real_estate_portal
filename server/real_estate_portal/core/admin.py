from django.contrib import admin
from core.models import Document, User, UserInvestorProfile

class UserAdmin(admin.ModelAdmin):
    exclude = ('password',)
    list_display = ('id', 'first_name', 'last_name', 'email')

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user',)

class DocumentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'user')


admin.site.register(User, UserAdmin)
admin.site.register(UserInvestorProfile, UserProfileAdmin)
admin.site.register(Document, DocumentsAdmin)
