from django.urls import path
from .views import PictureViewSet


urlpatterns = [
    path('pictures/', PictureViewSet.as_view(), name='picture_list')
]
