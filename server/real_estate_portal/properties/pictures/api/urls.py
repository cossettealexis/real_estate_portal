from .views import PictureViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'pictures', PictureViewSet)
urlpatterns = router.urls
