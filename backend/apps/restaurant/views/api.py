from accounts.models import Customer, RestaurantOwner
from restaurant.models import Restaurant
from restaurant.serializer import RestaurantSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

#@api_view(['POST'])
#@permission_classes([IsAuthenticated])

@api_view(['POST'])
def create_restaurant(request):
    data = request.data
    owner_id = data.get('owner_id')
    try:
        owner = RestaurantOwner.objects.get(owner_id=owner_id)
    except RestaurantOwner.DoesNotExist:
        try:
            customer = Customer.objects.get(id=owner_id)
            owner = RestaurantOwner.objects.create(owner=customer)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
    if Restaurant.objects.filter(owner=owner).exists():
        return Response({"error": "Owner already has a restaurant"}, status=status.HTTP_400_BAD_REQUEST)
    
    restaurant_serializer = RestaurantSerializer(data=data)
    if restaurant_serializer.is_valid():
        restaurant_serializer.save(owner=owner)
        return Response(restaurant_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(restaurant_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RestaurantListAPI(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    
class RestaurantDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantSearchAPI(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', None)
        if not query:
            return Response({"error": "A search query is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        results = Restaurant.objects.filter(name__icontains=query)
        serializer = RestaurantSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RestaurantTopTen(generics.ListAPIView):
    queryset = Restaurant.objects.order_by('-rating')[:]
    serializer_class = RestaurantSerializer
