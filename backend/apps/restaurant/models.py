from django.db import models
from multiselectfield import MultiSelectField
# Create your models here.
from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw

class Restaurant(models.Model):
    DAYS_OF_WEEK = (
        ('MO', 'Monday'),
        ('TU', 'Tuesday'),
        ('WE', 'Wednesday'),
        ('TH', 'Thursday'),
        ('FR', 'Friday'),
        ('SA', 'Saturday'),
        ('SU', 'Sunday'),
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.OneToOneField('accounts.RestaurantOwner', on_delete=models.CASCADE, null=True, blank=True, unique=True)

    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    website_link = models.URLField(blank=True, null=True)
    social_media_link = models.URLField(blank=True, null=True)
    email = models.EmailField(max_length=255)
    
    capacity = models.PositiveIntegerField()
    services = models.CharField(max_length=200)
    accessibility = models.CharField(max_length=200)
    parking = models.BooleanField(default=False)
    opening_time = models.TimeField()
    closing_time = models.TimeField()       
    opening_days = MultiSelectField(choices=DAYS_OF_WEEK)    
    speciality = models.CharField(max_length=255)
    
    rating = models.IntegerField()
    code = models.ImageField(blank=True, upload_to='code')
    main_image = models.ImageField(upload_to='restaurant_images/', blank=True, null=True)
    def __str__(self):
        return self.name
    
    class Meta:
        app_label = 'restaurant'
            
    def save(self,  *args, **kwargs):
        qr_image = qrcode.make(self.name)
        qr_offset = Image.new('RGB', (310, 310), "white")
        qr_offset.paste(qr_image)
        file_name = f"{self.name}-{self.id}qr.png"
        stream = BytesIO()
        qr_offset.save(stream, "PNG")
        self.code.save(file_name, File(stream), save=False)
        qr_offset.close()
        super().save(*args, **kwargs)
        
class RestaurantImage(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='secondary_images')
    image = models.ImageField(upload_to='restaurant_images/')

    def __str__(self):
        return f"{self.restaurant.name} Image"
    class Meta:
        app_label = 'restaurant'
    