from rest_framework import serializers
from rest_framework.reverse import reverse
from properties.models import Properties
from properties.properties.api.serializers import PropertySerializer


class AmenityListSerializer(serializers.ModelSerializer):
    """
    Serializer to list/retrieve property.
    """
    amenity = serializers.CharField(max_length=999, required=True, allow_null=False, allow_blank=False)
    property = PropertySerializer(required=True)

    class Meta(object):
        model = Properties
        read_only_fields = (
            'id',
        )
        fields = (
            'id',
            'amenity',
            'property',
        )
        

class AmenitySerializer(AmenityListSerializer):
    """
    Serializer to use in relations,
    includes link to list endpoint.
    """
    list_url = serializers.SerializerMethodField(read_only=True)

    class Meta(AmenityListSerializer.Meta):
        fields = AmenityListSerializer.Meta.fields + ('list_url',)

    def get_list_url(self, instance):
        return reverse('amenities-list', request=self.context['request'])
        