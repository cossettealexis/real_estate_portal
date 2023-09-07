from .views import PropertyViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
urlpatterns = router.urls
