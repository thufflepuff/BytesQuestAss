from django.urls import path
from api import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('user/register/', views.CreateUserView.as_view(), name="register"),
    path('user/login/', views.LoginUserView.as_view(), name="login"),
    #path('user/delete/<int:pk>/', views.UserDeleteView.as_view(), name='delete-user'),

    path('user/<str:username>/', views.UserProfileView.as_view(), name="vaahiaad"),

    path('account/add', views.AccountAdd.as_view(), name="add"),
    path('account/remove/<int:pk>/', views.AccountRemove.as_view(), name="delete"),
    path('account/', views.AccountList.as_view()),

    path('token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
]