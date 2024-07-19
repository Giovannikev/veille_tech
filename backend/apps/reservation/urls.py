from django.urls import path

from reservation.views import views
from reservation.views import api


urlpatterns = [
    path('', views.ReservationsListView.as_view(), name='reservation-list'),
    path('reservation_restaurant/<int:id>/', views.reservation_create, name='reservation-restaurant'),
    path('update/<int:id>/', views.reservation_update, name='reservation-update'),
    path('confirmation/<int:id>/', views.reservation_confirmation, name='reservation-confirmation'),
    path('ticket/<int:id>/', views.reservation_ticket, name='reservation-ticket'),
    path('pending/<int:id>/', views.reservation_pending, name='reservation-pending'),
    path('canceled/<int:id>/', views.reservation_cancel, name='reservation-cancel'),
    
    path('search/api/', api.ReservationSearchAPI.as_view(), name='reservation-search-api'),
    path('list/api/', api.ReservationListCreateAPI.as_view(), name='reservation-list-api'),
    path('admin/list/api/<int:restaurant_id>/', api.AdminReservationListCreateAPI.as_view(), name='admin-reservations'),    
    path('detail/api/<int:pk>/', api.ReservationDetailAPI.as_view(), name='reservation-detail'),
    path('reservations/api/<int:restaurant_id>/', api.RestaurantReservationListView.as_view(), name='restaurant-reservation-list'),
    path('count-by-day/api/<int:restaurant_id>/', api.ReservationCountByDayAPI.as_view(), name='reservation_count_by_day_api'),
    path('table-occupation-rate/<int:restaurant_id>/<str:date>/', api.TableOccupationRateAPI.as_view(), name='table-occupation-rate'), 
    path('reservation-counts-by-creation-date/<int:restaurant_id>/', api.ReservationCountsByCreationDateAPI.as_view(), name='reservation-counts-by-creation-date'),
    path('reservations-today-count/api/<int:restaurant_id>/', api.reservations_today_count, name='reservations_today_count'),
    path('total-reservations-count/api/<int:restaurant_id>/', api.total_reservations_count, name='total_reservations_count'),
    path('future-reservations-count/api/<int:restaurant_id>/', api.future_reservations_count, name='future_reservations_count'),
]