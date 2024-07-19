from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import Customer

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = Customer
        fields = ["email", "first_name", "last_name"]
        error_class = "error"

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Customer
        fields = ["email", "first_name", "last_name"]
        error_class = "error"