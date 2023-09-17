from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from properties.models import Properties
from .serializers import PropertyListSerializer


class PropertyViewSet(ModelViewSet):
    """
    Viewset for Property model.
    """
    model = Properties
    authentication_classes = (TokenAuthentication, )
    queryset = Properties.objects.select_related(
        'type',
    ).all()
    serializer_class = PropertyListSerializer
