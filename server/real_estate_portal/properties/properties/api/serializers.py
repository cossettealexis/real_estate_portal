from django.db import models
from rest_framework import serializers
from rest_framework.reverse import reverse
from properties.models import Amenity, Properties, PropertyInvestor
from properties.category.api.serializers import CategorySerializer
from properties.pictures.api.serializers import PictureListSerializer


class PropertyListSerializer(serializers.ModelSerializer):
    """
    Serializer to list/retrieve property.
    """
    name = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=False)
    address1 = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=False)
    address2 = serializers.CharField(max_length=100, required=False, allow_null=True, allow_blank=True)
    amenities = serializers.SerializerMethodField()
    bath = serializers.IntegerField(required=False),
    bed = serializers.IntegerField(required=True),
    buildYear = serializers.IntegerField(required=True),
    city = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=True)
    country = serializers.CharField(max_length=100, required=True, allow_null=False, allow_blank=True)
    image = PictureListSerializer(required=True, many=True)
    investors = serializers.SerializerMethodField()
    longDescription = serializers.CharField(source='longDesc', required=True, allow_null=False, allow_blank=False)
    numberOfStocks = serializers.SerializerMethodField()
    rentalStatus = serializers.CharField(max_length=50, required=False, allow_null=True, allow_blank=True)
    property_image = serializers.SerializerMethodField(read_only=True)
    # property_images = serializers.SerializerMethodField(read_only=True)
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
            'amenities',
            'bath',
            'bed',
            'buildYear',
            'city',
            'country',
            'image',
            'investors',
            'longDescription',
            'name',
            'numberOfStocks',
            'property_image',
            # 'property_images',
            'purchasePrice',
            'rentalStatus',
            'slug',
            'squareFeet',
            'state',
            'type',
            'zip',
        )

    def get_property_image(self, obj):
        if obj.image.all():
            image = obj.image.all().first()
            return image.picture.url
        else:
            return None
        

    def get_amenities(self, obj):
        amenities = Amenity.objects.filter(property=obj.pk).values_list('amenity')
        return amenities
    
    def get_investors(self, obj):
        investors = PropertyInvestor.objects.filter(propertyId=obj.pk)
        return investors.count()
    
    def get_numberOfStocks(self, obj):
        total_number_of_stocks = PropertyInvestor.objects.filter(propertyId=obj).aggregate(total_stocks=models.Sum('numberOfStocks'))['total_stocks']
        return total_number_of_stocks

    
    # def get_property_images(self, obj):
    #         # Get all images associated with the property
    #     all_images = obj.image.all()

    #     # Check if there are any images
    #     if not all_images:
    #         return []

    #     # Shuffle the list of images to make the selection random
    #     random.shuffle(all_images)

    #     # Create a list of 4 images by repeating and extending the shuffled list
    #     # If there are fewer than 4 images, the list will contain duplicates
    #     selected_images = all_images * (4 // len(all_images)) + all_images[:4 % len(all_images)]

    #     # Extract the URLs or any other properties of the selected images
    #     image_data = [image for image in selected_images]

    #     return image_data
        

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
        