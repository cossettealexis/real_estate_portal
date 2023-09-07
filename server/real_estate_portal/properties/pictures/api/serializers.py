from rest_framework import serializers
from properties.models import Pictures
from rest_framework.reverse import reverse

class PictureListSerializer(serializers.ModelSerializer):
    """
    Serializer to list/retrieve picture.
    """
    picture = serializers.FileField(required=True)
    index = serializers.CharField(max_length=100, required=False, allow_null=True, allow_blank=True)
    isVideo = serializers.BooleanField(required=False)

    class Meta(object):
        model = Pictures
        read_only_fields = (
            'id',
        )
        fields = (
            'id',
            'index',
            'isVideo',
            'picture',
        )


class PictureSerializer(PictureListSerializer):
    """
    Serializer to use in relations,
    includes link to list endpoint.
    """
    list_url = serializers.SerializerMethodField(read_only=True)

    class Meta(PictureListSerializer.Meta):
        fields = PictureListSerializer.Meta.fields + ('list_url',)

    def get_list_url(self, instance):
        return reverse('pictures-list', request=self.context['request'])
