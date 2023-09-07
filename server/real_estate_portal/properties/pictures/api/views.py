from rest_framework.generics import ListAPIView
from rest_framework.authentication import TokenAuthentication
from properties.models import Pictures
from .serializers import PictureListSerializer


class PictureViewSet(ListAPIView):
    """
    Viewset for Picture model.
    """
    model = Pictures
    authentication_classes = (TokenAuthentication, )
    queryset = Pictures.objects.all()
    serializer_class = PictureListSerializer
