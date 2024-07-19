from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser

from reservation.models import Reservation
from table.serializer import TableSerializer
from ..models import Table
from datetime import datetime
"""
class AvailableTablesAPI(APIView):
    def get(self, request, *args, **kwargs):
        date = request.GET.get('date')
        if not date or not date:
            return Response({"error": "Date is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Filtrer les tables non occupées et disponibles pour la date spécifiée
        reserved_tables = Reservation.objects.filter(reservation_date=date).values_list('table_id', flat=True)
        available_tables = Table.objects.filter(
            statut='Non occupé'
        ).exclude(id__in=reserved_tables)

        serializer = TableSerializer(available_tables, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
"""
@api_view(['GET'])
def available_tables(request, restaurant_id, date):
    date = datetime.strptime(date, '%Y-%m-%d').date()
    tables = Table.objects.filter(restaurant_id=restaurant_id, statut='Non occupé')
    reserved_tables = \
        Reservation.objects.filter(reservation_date=date, table__in=tables)\
            .values_list('table_id', flat=True)
    available_tables = tables.exclude(id__in=reserved_tables)
    serializer = TableSerializer(available_tables, many=True)
    return Response(serializer.data)

class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    parser_classes = (MultiPartParser, FormParser)
    def get_queryset(self):
        restaurant_id = self.request.query_params.get('restaurant')
        if restaurant_id:
            return self.queryset.filter(restaurant=restaurant_id)
        return None