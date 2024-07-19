from django.urls import path
from . import views


urlpatterns = [
        path('', views.ChatbotAPI.as_view(), name='chatbot-api'),
]