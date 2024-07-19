from django.contrib import admin 
from django.urls import path

from . views import views
from . views import api

urlpatterns = [
    path("signup/", views.signup_user, name="signup"),
    path("login/", views.UserLoginView.as_view(), name="login"),
    path("logout/", views.UserLogoutView.as_view(), name="logout"),
    
    path('api/signup/', api.signup_user, name='signup_user'),
    path('api/login/', api.login_user, name='login_user'),
    path('current_user/', api.current_user_info, name='current_user_info'),
    path('api/check-restaurant/', api.check_user_restaurant, name='check_user_restaurant'),
]
