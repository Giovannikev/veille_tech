from django.db import models
from multiselectfield import MultiSelectField

from restaurant.models import Restaurant

# Model for individual dishes
class Dish(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='dishes')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='dish_images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        app_label = 'menu'
        
        
# Model for restaurant menus
class Menu(models.Model):
    DAYS_OF_WEEK = (
        ('MO', 'Monday'),
        ('TU', 'Tuesday'),
        ('WE', 'Wednesday'),
        ('TH', 'Thursday'),
        ('FR', 'Friday'),
        ('SA', 'Saturday'),
        ('SU', 'Sunday'),
    )
    APPETIZERS = 'APPETIZERS'
    MAIN_COURSES = 'MAIN_COURSES'
    SIDE_DISHES = 'SIDE_DISHES'
    DESSERTS = 'DESSERTS'
    BEVERAGES = 'BEVERAGES'
    SALADS = 'SALADS'
    SOUPS = 'SOUPS'
    SPECIALS = 'SPECIALS'

    CATEGORY_CHOICES = [
        (APPETIZERS, 'Entrées'),
        (MAIN_COURSES, 'Plats de résistance'),
        (SIDE_DISHES, 'Accompagnements'),
        (DESSERTS, 'Desserts'),
        (BEVERAGES, 'Boissons'),
        (SALADS, 'Salades'),
        (SOUPS, 'Soupes'),
        (SPECIALS, 'Plats du jour'),
    ]
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menus')
    name = models.CharField(max_length=255)
    dishes = models.ManyToManyField(Dish, related_name='menus')
    available_days = MultiSelectField(choices=DAYS_OF_WEEK)
    category = models.CharField(
        max_length=25, 
        choices=CATEGORY_CHOICES,
        default=APPETIZERS,
        )

    def __str__(self):
        return self.name
    
    class Meta:
        app_label = 'menu'