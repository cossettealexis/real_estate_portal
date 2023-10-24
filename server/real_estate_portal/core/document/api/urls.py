from .views import DocumentViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'documents', DocumentViewSet)
urlpatterns = router.urls
