from django.urls import include, path

urlpatterns = [
    path('', include('core.auth.api.urls')),
    path('', include('core.plaid.api.urls')),
    path('', include('core.document.api.urls')),
]
