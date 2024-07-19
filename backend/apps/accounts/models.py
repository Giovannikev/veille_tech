from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _

from restaurant.models import Restaurant
from .managers import CustomUserManager

class Customer(AbstractBaseUser, PermissionsMixin):
     
    SEX_CHOICES = [
        ('M', 'Homme'),
        ('F', 'Femme'),
        ('O', 'Autre'),
    ]
    first_name = models.CharField(_("First Name"), max_length=100)
    last_name = models.CharField(_("Last Name"), max_length=100)
    email = models.EmailField(_("Email Address"), max_length=254, unique=True)
   
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_joined =  models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='user_images/', blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    class Meta:
        app_label = 'accounts'
        
        
class RestaurantOwner(models.Model):
    owner = models.OneToOneField(Customer, on_delete=models.CASCADE)
    class Meta:
        app_label = 'accounts'
    def __str__(self):
        return f"{self.owner.first_name} {self.owner.last_name} "