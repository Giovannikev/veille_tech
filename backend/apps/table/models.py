from django.db import models

from restaurant.models import Restaurant


class Table(models.Model):
    TABLE_TYPES = [
        ('VIP', 'VIP'),
        ('Simple', 'Simple'),
        ('Familiale', 'Familiale'),

    ]
    STATUS_CHOICES = [
        ('Occupé', 'Occupé'),
        ('Non occupé', 'Non occupé'),
    ]
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    nb_place = models.IntegerField(default=0)
    number = models.IntegerField(default=0)
    type_table = models.CharField(max_length=50, choices=TABLE_TYPES)
    statut = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Non occupé')
    nb_chaises = models.IntegerField(default=0)
    quantity = models.IntegerField(default=0)
    image = models.ImageField(blank=True, upload_to='qr_codes/')

    def __str__(self):
        return f"Table {self.id} - {self.type_table} - {self.statut}"
