
from django.shortcuts import redirect, render
from django.views.generic import ListView, DetailView

from restaurant.serializer import RestaurantSerializer
from restaurant.models import Restaurant

class RestaurantListView(ListView):
    model = Restaurant
    template_name = 'restaurant/restaurant_list.html'  
    context_object_name = 'restaurants' 

class RestaurantDetailView(DetailView):
    model = Restaurant
    template_name = 'restaurant/restaurant_detail.html'
    context_object_name = 'restaurant'

def search_restaurant(request):
    query = request.GET.get('q')
    if (not query):
        return redirect('restaurant-list')
    results = Restaurant.objects.filter(name__icontains=query) if query else None
    return render(request, 'restaurant/restaurant_list.html', {'results': results})
