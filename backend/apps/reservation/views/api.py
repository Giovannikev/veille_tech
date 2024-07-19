from django.db.models import Q,Count
from django.utils import timezone

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from table.models import Table
from reservation.models import Reservation
from reservation.serializer import ReservationSerializer
class RestaurantReservationListView(generics.ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        restaurant_id = self.kwargs['restaurant_id']
        return Reservation.objects.filter(restaurant_id=restaurant_id,status=Reservation.CONFIRMED)
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class ReservationDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    def perform_destroy(self, instance):
        instance.status = Reservation.CANCELLED
        instance.save()

class ReservationListCreateAPI(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(customer=user, status=Reservation.CONFIRMED)

class AdminReservationListCreateAPI(generics.ListCreateAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        restaurant_id = self.kwargs.get('restaurant_id')
        return Reservation.objects.filter(restaurant_id=restaurant_id)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
class TableOccupationRateAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, restaurant_id, date):
        # Filtrer les réservations confirmées pour la date donnée
        reservations = Reservation.objects.filter(restaurant_id=restaurant_id, reservation_date=date)
        total_tables = Table.objects.filter(restaurant_id=restaurant_id).count()
        
        # Tables occupées
        occupied_table_ids = reservations.values_list('table_id', flat=True)
        occupied_tables = occupied_table_ids.count()

        # Tables non occupées        
        unoccupied_tables = max(0, total_tables - occupied_tables)

        data = {
            'occupied': occupied_tables,
            'unoccupied': unoccupied_tables,
        }
        return Response(data, status=status.HTTP_200_OK)
  
class ReservationSearchAPI(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', None)
        if not query:
            return Response({"error": "A search query is required."}, status=status.HTTP_400_BAD_REQUEST)
        results = Reservation.objects.filter(
            Q(restaurant__name__icontains=query) & Q(status=Reservation.CONFIRMED)
        )
        serializer = ReservationSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ReservationCountByDayAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,restaurant_id):
        reservation_counts = Reservation.objects.filter(restaurant_id=restaurant_id).values('reservation_date').annotate(count=Count('id'))
        data = {
            'labels': [entry['reservation_date'].strftime('%Y-%m-%d') for entry in reservation_counts],
            'counts': [entry['count'] for entry in reservation_counts],
        }
        return Response(data)
    
class ReservationCountsByCreationDateAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, restaurant_id):
        reservation_counts = (
            Reservation.objects
            .filter(restaurant_id=restaurant_id)
            .values('created_at__date')
            .annotate(count=Count('id'))
            .order_by('created_at__date')
        )

        data = {
            'labels': [entry['created_at__date'].strftime('%Y-%m-%d') for entry in reservation_counts],
            'counts': [entry['count'] for entry in reservation_counts],
        }
        return Response(data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reservations_today_count(request, restaurant_id):
    today = timezone.now().date()
    count = Reservation.objects.filter(restaurant_id=restaurant_id, reservation_date=today).count()
    return Response({'count': count}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def total_reservations_count(request, restaurant_id):
    count = Reservation.objects.filter(restaurant_id=restaurant_id).count()
    return Response({'count': count}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def future_reservations_count(request, restaurant_id):
    future_reservations = Reservation.objects.filter(restaurant_id=restaurant_id, reservation_date__gt=timezone.now().date())
    count = future_reservations.count()
    return Response({'count': count}, status=status.HTTP_200_OK)