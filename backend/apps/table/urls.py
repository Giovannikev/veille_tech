from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
from .api import views as api_view
router = DefaultRouter()
router.register(r'tables', api_view.TableViewSet, basename='table')
urlpatterns = [
    path('', views.table_list, name='table_list'),
    path('edit/<int:pk>/', views.table_edit, name='table_edit'),
    path('news/', views.table_create, name='table_create'),
    path('<int:pk>/delete/', views.table_delete, name='table-del'),
    path('count/', views.table_count, name='table-count'),
    
    path('available/api/<int:restaurant_id>/<str:date>/', api_view.available_tables, name='available-url'),
    path('add/api/', include(router.urls), name='available-url'),
]
