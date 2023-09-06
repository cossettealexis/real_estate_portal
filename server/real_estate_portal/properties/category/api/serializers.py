from rest_framework import serializers
from properties.models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """
    class Meta:
        model = Category
        fields = ('id', 'category_name')
        