from django.urls import path
from . import views

urlpatterns = [
    path('instagram/login/', views.instagram_login, name='instagram_login'),
    path('instagram/callback/', views.instagram_callback, name='instagram_callback'),
    path('instagram/profile/', views.instagram_profile, name='instagram_profile'),
]
