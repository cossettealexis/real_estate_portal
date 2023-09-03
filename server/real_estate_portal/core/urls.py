from django.urls import include, path

urlpatterns = [
    path('', include('core.auth.api.urls')),
]
