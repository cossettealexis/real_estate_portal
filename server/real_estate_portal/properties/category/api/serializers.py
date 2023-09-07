from rest_framework import serializers
from rest_framework.reverse import reverse
from properties.models import Category


class CategoryListSerializer(serializers.ModelSerializer):
    """
    Serializer to list/retrieve category.
    """
    category_name = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=False)

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
        fields = CategoryListSerializer.Meta.fields + ('list_url',)

    def get_list_url(self, instance):
        return reverse('category_list', request=self.context['request'])
        