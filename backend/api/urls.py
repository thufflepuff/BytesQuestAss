from django.urls import path
from api import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('user/register/', views.CreateUserView.as_view(), name="register"),
    path('user/login/', views.LoginUserView.as_view(), name="login"),
    path('user/', views.UserProfileView.as_view(), name="vaahiaad"),
    #path('user/delete/<int:pk>/', views.UserDeleteView.as_view(), name='delete-user'),

    path('accounts/', views.AccountListAll.as_view()),
    path('user/<str:username>/accounts/', views.AccountList.as_view()),
    path('user/<str:username>/account/add', views.AccountAdd.as_view(), name="add"),
    path('user/<str:username>/account/<int:pk>/', views.AccountView.as_view(), name="account-detail"),
    path('user/<str:username>/account/delete/<int:pk>/', views.AccountRemove.as_view(), name="delete"),

    path('token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
]