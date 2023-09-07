from django.urls import include, path

urlpatterns = [
    path('', include('properties.category.api.urls')),
    path('', include('properties.pictures.api.urls')),
]
