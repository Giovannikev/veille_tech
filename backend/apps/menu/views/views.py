from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from django.db.models import Count

from menu.models import Dish, Menu
from menu.forms import DishForm, MenuForm

## MENU
class MenuListView(generic.ListView):
    model = Menu
    template_name = "menu/menu_list.html"
    context_object_name = 'menus'

def menu_create(request):
    if request.method == 'POST':
        form = MenuForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('menu-list')
    else:
        form = MenuForm()
    return render(request, 'menu/menu_form.html', {'form': form})

def menu_update(request, pk):
    menu = get_object_or_404(Menu, pk=pk)
    if request.method == 'POST':
        form = MenuForm(request.POST, instance=menu)
        if form.is_valid():
            form.save()
            return redirect('menu-list')
    else:
        form = MenuForm(instance=menu)
    return render(request, 'menu/menu_form.html', {'form': form})


def menu_delete(request, pk):
    menu = get_object_or_404(Menu, pk=pk)
    if request.method == 'POST':
        menu.delete()
        return redirect('menu-list')
    return render(request, 'menu/menu_delete.html', {'menu': menu})


## DISH
class DishListView(generic.ListView):
    model = Dish
    template_name = "dish/dish_list.html"
    context_object_name = 'dishes'

def dish_create(request):
    if request.method == 'POST':
        form = DishForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('dish-list')
    else:
        form = DishForm()
    return render(request, 'dish/dish_form.html', {'form': form})

def dish_update(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    if request.method == 'POST':
        form = DishForm(request.POST, instance=dish)
        if form.is_valid():
            form.save()
            return redirect('dish-list')
    else:
        form = DishForm(instance=dish)
    return render(request, 'dish/dish_form.html', {'form': form})

def dish_delete(request, pk):
    dish = get_object_or_404(Dish, pk=pk)
    if request.method == 'POST':
        dish.delete()
        return redirect('dish-list')
    return render(request, 'dish/dish_delete.html', {'menu': dish})

def count_dishes_by_category(request):
    category_counts = Menu.objects.values('categorie').annotate(count=Count('categorie')).order_by('categorie')
    return render(request, 'menu/category_counts.html', {'category_counts': category_counts})
