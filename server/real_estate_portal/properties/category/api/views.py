from rest_framework.generics import ListAPIView
from rest_framework.authentication import TokenAuthentication
from properties.models import Category
from .serializers import CategoryListSerializer


class CategoryViewSet(ListAPIView):
    """
    Viewset for Category model.
    """
    model = Category
    authentication_classes = (TokenAuthentication, )
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer
