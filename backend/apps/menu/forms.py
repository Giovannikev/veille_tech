from django import forms
from .models import Dish, Menu

class MenuForm(forms.ModelForm):
    class Meta:
        model = Menu
        fields = ['restaurant', 'name', 'dishes', 'available_days',"category"]

class DishForm(forms.ModelForm):
    class Meta:
        model = Dish
        fields = ['name', 'description', 'price', 'image']