from rest_framework import serializers
from rest_framework.reverse import reverse
from properties.models import Properties
from properties.category.api.serializers import CategorySerializer
from properties.pictures.api.serializers import PictureSerializer


class PropertyListSerializer(serializers.ModelSerializer):
    """
    Serializer to list/retrieve property.
    """
    name = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=False)
    address1 = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=False)
    address2 = serializers.CharField(max_length=100, required=False, allow_null=True, allow_blank=True)
    bath = serializers.IntegerField(required=False),
    bed = serializers.IntegerField(required=True),
    buildYear = serializers.IntegerField(required=True),
    city = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=True)
    country = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=True)
    image = PictureSerializer(required=True)
    longDescription = serializers.CharField(source='longDesc', required=True, allow_null=False, allow_blank=False)
    rentalStatus = serializers.CharField(max_length=50, required=False, allow_null=True, allow_blank=True)
    purchasePrice = serializers.FloatField(required=True)
    squareFeet = serializers.FloatField(required=False, allow_null=True)
    state = serializers.CharField(max_length=100, required=False, allow_null=True, allow_blank=True)
    type = CategorySerializer(required=True, allow_null=False)
    zip = serializers.IntegerField(required=False)

    class Meta(object):
        model = Properties
        read_only_fields = (
            'id',
            'slug',
        )
        fields = (
            'id',
            'address1',
            'address2',
            'bath',
            'bed',
            'buildYear',
            'city',
            'country',
            'image',
            'longDescription',
            'name',
            'purchasePrice',
            'rentalStatus',
            'slug',
            'squareFeet',
            'state',
            'type',
            'zip',
        )
        

class PropertySerializer(PropertyListSerializer):
    """
    Serializer to use in relations,
    includes link to list endpoint.
    """
    list_url = serializers.SerializerMethodField(read_only=True)

    class Meta(PropertyListSerializer.Meta):
        fields = PropertyListSerializer.Meta.fields + ('list_url',)

    def get_list_url(self, instance):
        return reverse('properties-list', request=self.context['request'])
        