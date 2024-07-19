from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import get_user_model, login
from rest_framework.permissions import BasePermission

User = get_user_model()

def signup_user(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = User.objects.create_user(
            username = username, 
            password = password,
            email = email
        )
        login(request, user)
        return redirect("home")
    return render(request, 'accounts/signup.html')
    
class UserLoginView(LoginView):
    template_name = 'accounts/login.html'

class UserLogoutView(LogoutView):
    next_page = reverse_lazy('home')
    from rest_framework.permissions import BasePermission

class IsAdminOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user and (request.user.is_staff or obj.owner == request.user)