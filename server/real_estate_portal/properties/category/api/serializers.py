from rest_framework import serializers
from rest_framework.reverse import reverse
from properties.models import Category


class CategoryListSerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """
    category_name = serializers.CharField(required=True, allow_null=False, allow_blank=False)

    class Meta(object):
        model = Category
        read_only_fields = (
            'id',
        )
        fields = (
            'id',
            'category_name',
            )
        

class CategorySerializer(CategoryListSerializer):
    """
    Serializer to use in relations,
    includes link to list endpoint.
    """
    list_url = serializers.SerializerMethodField(read_only=True)

    class Meta(CategoryListSerializer.Meta):
        pass

    def get_list_url(self, instance):
        return reverse('category-list', request=self.context['request'])
        