from rest_framework import routers
from django.urls import include, path

from core.auth.api.views import (
    register_user,
    user_login,
    user_logout,
    update_user_profile,
    UserViewSet,
    CountryViewSet,
)


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('update-user-profile/<int:user_id>/', update_user_profile, name='update_user_profile'),
    path('countries/', CountryViewSet.as_view(), name='countries'),
    path('', include(router.urls)),
]
