from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from properties.models import Pictures
from .serializers import PictureListSerializer


class PictureViewSet(ModelViewSet):
    """
    Viewset for Picture model.
    """
    model = Pictures
    authentication_classes = (TokenAuthentication, )
    queryset = Pictures.objects.all()
    serializer_class = PictureListSerializer
