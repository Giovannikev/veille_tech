from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from ..models import Dish, Menu
from ..serializer import DishSerializer, MenuSerializer

class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurant')
        if restaurant_id:
            return self.queryset.filter(restaurant_id=restaurant_id)
        return None

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurant')
        if restaurant_id:
            return self.queryset.filter(restaurant_id=restaurant_id)
        return None
