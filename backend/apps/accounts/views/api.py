from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login

from ..serializers import CustomerSerializer
from ..models import Customer, RestaurantOwner  
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
User = get_user_model()

@api_view(['POST'])
def signup_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    sex = request.data.get("sex")
    phone = request.data.get("phone")
    
    if not username or not email or not password:
        return Response({"error": "Please provide all required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password, sex=sex, phone=phone)
    login(request, user)
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")
    
    user = authenticate(request, email=email, password=password)
    
    if user is not None:
        login(request, user)
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_info(request):
    user = request.user  
    try:
        customer = Customer.objects.get(id=user.id)
    except Customer.DoesNotExist:
        return Response({"error": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)
    serializer = CustomerSerializer(customer)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user_restaurant(request):
    try:
        restaurant_owner = RestaurantOwner.objects.get(owner=request.user)
        restaurant_id = restaurant_owner.restaurant.id if restaurant_owner.restaurant else None
        return Response({'restaurant_id': restaurant_id}, status=status.HTTP_200_OK)
    except RestaurantOwner.DoesNotExist:
        return Response({'restaurant_id': None}, status=status.HTTP_200_OK)