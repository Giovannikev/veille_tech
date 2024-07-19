from django.urls import path,include
from rest_framework.routers import DefaultRouter
router_menu = DefaultRouter()
router_dish = DefaultRouter()

from .views import views
from .views import api
from .api import views as api_view

router_menu.register(r'dish', api_view.DishViewSet, basename='dishes')
router_menu.register(r'menu', api_view.MenuViewSet, basename='menus')

urlpatterns = [
    path('add/api/', include(router_menu.urls), name='dish-url'),
    path('add/api/', include(router_menu.urls), name='menu-url'),
    
    path('', views.MenuListView.as_view(), name='menu-list'),
    path('create/', views.menu_create, name='menu-create'),
    path('edit/<int:pk>/', views.menu_update, name='menu-update'),
    path('delete/<int:pk>/', views.menu_delete, name='menu-delete'),
    
    path('dishes', views.DishListView.as_view(), name='dish-list'),
    path('dish/create/', views.dish_create, name='dish-create'),
    path('dish/edit/<int:pk>/', views.dish_update, name='dish-update'),
    path('dish/delete/<int:pk>/', views.dish_delete, name='dish-delete'),
    
    path('list/api/<int:restaurant_id>/', api.MenuListAPIView.as_view(), name='menu-list-create'),
    path('detail/api/<int:pk>/', api.MenuDetailAPIView.as_view(), name='menu-detail'),
    path('dish/list/api/', api.DishListAPIView.as_view(), name='dish-list-create'),
    path('dish/detail/api/<int:pk>/', api.DishDetailAPIView.as_view(), name='dish-detail'),
]