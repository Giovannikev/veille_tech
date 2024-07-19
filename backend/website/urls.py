from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static

from website import settings

urlpatterns = [
    path('', include("home.urls")),
    path('chatbot/', include("chatbot.urls")),
    path('restaurant/', include("restaurant.urls")),
    path('menu/', include("menu.urls")),
    path('table/', include("table.urls")),
    path('reservation/', include("reservation.urls")),
    path('accounts/', include("accounts.urls")),
    path('admin/', admin.site.urls),
    
    path("api/v1/auth/", include('djoser.urls')),
    path("api/v1/auth/", include('djoser.urls.jwt')),
    
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT) 