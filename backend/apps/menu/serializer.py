from rest_framework import serializers

from .models import Menu, Dish
        
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)
    dish_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Dish.objects.all(), write_only=True, source='dishes')
    available_days = serializers.ListField(child=serializers.CharField())
    class Meta:
        model = Menu
        fields = '__all__'
