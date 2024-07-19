from rest_framework import serializers
from .models import Reservation
from accounts.models import Customer
from restaurant.models import Restaurant
from table.models import Table

class ReservationSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    restaurant_image = serializers.CharField(source='restaurant.main_image', read_only=True)
    customer_first_name = serializers.CharField(source='customer.first_name', read_only=True)
    table_id = serializers.CharField(source='table.number', read_only=True)
    nb_personne = serializers.CharField(source='table.nb_place', read_only=True)

    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ['qr_code']
