from django.db import models

from accounts.models import Customer
from table.models import Table
from restaurant.models import Restaurant
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw

class Reservation(models.Model):
    CONFIRMED = 'confirmed'
    CANCELLED = 'cancelled'
    STATUS_CHOICES = [
        (CONFIRMED, 'Confirmed'),
        (CANCELLED, 'Cancelled'),
    ]

    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)    
    table = models.ForeignKey(Table, on_delete=models.CASCADE)    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    reservation_date = models.DateField()
    reservation_time = models.TimeField()
    occasion = models.CharField(max_length=100, blank=True, null=True)
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=CONFIRMED,
    )
    created_at = models.DateTimeField(auto_now_add=True)  
    qr_code = models.ImageField(blank=True, upload_to='qr_codes/')
    
    def save(self, *args, **kwargs):
         
        qr_data = f"Reservation ID: {self.pk}\nRestaurant: {self.restaurant.name}\nClient: {self.customer.first_name} {self.customer.last_name}\nClient ID: {self.customer.pk}\nDate: {self.reservation_date}\nTime: {self.reservation_time}\n"

        qr_image = qrcode.make(qr_data)
        qr_offset = Image.new('RGB', (580, 580), "white")
        qr_offset.paste(qr_image)
        file_name = f"reservation-{self.id}-qr.png"
        stream = BytesIO()
        qr_offset.save(stream, "PNG")
        self.qr_code.save(file_name, File(stream), save=False)
        qr_offset.close()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Reservation {self.pk} - {self.reservation_date} at {self.reservation_time}"
