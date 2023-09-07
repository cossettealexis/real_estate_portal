from .views import AmenityViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'amenities', AmenityViewSet)
urlpatterns = router.urls
