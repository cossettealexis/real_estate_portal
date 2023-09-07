from django.urls import path
from .views import CategoryViewSet


urlpatterns = [
    path('categories/', CategoryViewSet.as_view(), name='category_list')
]
