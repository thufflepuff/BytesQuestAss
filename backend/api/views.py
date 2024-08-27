#from django.shortcuts import render

from .serializers import UserSerializer, AccountSerializer, TokenRefreshSerializer, UserLoginSerializer
from .models import User, Account

from rest_framework.generics import ListAPIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import base64
# Create your views here.

class TokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TokenRefreshSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Return a simple message indicating successful registration
        return Response({"message": "User has been registered"}, status=201)


class LoginUserView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(Username=serializer.validated_data['Username'])

        # Generate tokens
        print("chala toh i guess")
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        

        # Return user data along with tokens
        return Response({
            'user': {
                'id': user.id,
                'Username': user.Username,
                'Firstname': user.Firstname,
                'Lastname': user.Lastname,
                'Email': user.Email,
                'Image': user.Image,
            },
            'tokens': {
                'access': access_token,
                'refresh': refresh_token
            }
        })

class UserList(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.values('id','Username')
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(queryset)

class AccountAdd(generics.ListCreateAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(owner=user.id)
    
    def add_account(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)      

class AccountRemove(generics.DestroyAPIView):
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(author=user)

class AccountList(ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
