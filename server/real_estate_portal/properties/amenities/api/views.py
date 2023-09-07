from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from properties.models import Amenity
from .serializers import AmenityListSerializer


class AmenityViewSet(ModelViewSet):
    """
    Viewset for Picture model.
    """
    model = Amenity
    authentication_classes = (TokenAuthentication, )
    queryset = Amenity.objects.select_related(
        'property',
    ).all()
    serializer_class = AmenityListSerializer
