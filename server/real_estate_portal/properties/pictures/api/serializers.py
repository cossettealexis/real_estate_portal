from rest_framework import serializers
from properties.models import Pictures

class PicturesListSerializer(serializers.ModelSerializer):
    """
    Serializer to list/retrieve picture.
    """
    picture = serializers.FileField(required=True, allow_null=False, allow_blank=False)
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
            'isVideo'
            'picture',
        )

class PicturesChangeSerializer(PicturesListSerializer):
    class Meta(PicturesListSerializer.Meta):
        pass
