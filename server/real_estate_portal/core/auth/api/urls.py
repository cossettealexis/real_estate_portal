from django.urls import include, path

from core.auth.api.views import (
    register_user,
    user_login,
    user_logout,
)


urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
]
