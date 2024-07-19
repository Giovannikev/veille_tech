from rest_framework import serializers
from . models import *

class RestaurantImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantImage
        fields = ['id', 'image']

class RestaurantSerializer(serializers.ModelSerializer):
    secondary_images = RestaurantImageSerializer(many=True, read_only=True)
    opening_days = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Restaurant
        fields = '__all__'