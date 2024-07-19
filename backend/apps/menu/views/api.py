from rest_framework import generics

from menu.models import Menu, Dish
from menu.serializer import MenuSerializer, DishSerializer

class MenuListAPIView(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return Menu.objects.filter(restaurant__id=restaurant_id)
    
class MenuDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class DishListAPIView(generics.ListCreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    
class DishDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    