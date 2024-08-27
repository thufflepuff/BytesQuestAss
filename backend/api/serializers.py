from rest_framework import serializers
from .models import User, Account

from rest_framework_simplejwt.tokens import RefreshToken, TokenError

#User register kaarne ke liye
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','Username', 'Password','Firstname','Lastname', 'Email', 'Image']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data.get('Username')
        password = validated_data.get('Password')
        firstname = validated_data.get('Firstname', 'Raju')
        lastname = validated_data.get('Lastname', 'Rastogi')
        email = validated_data.get('Email', 'example@email.com')
        image = validated_data.get('Image', 'NULL')

        # Call the create_user method
        user = User.create_user(
            username=username,
            password=password,
            firstname=firstname,
            lastname=lastname,
            email=email,
            image=image
        )
        return user
    
#login ke liye
class UserLoginSerializer(serializers.Serializer):
    Username = serializers.CharField()
    Password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("Username")
        password = data.get("Password")

        try:
            user = User.objects.get(Username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist.")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")

        # logic to return all fields
        return {
            'id': user.id,
            'Username': user.Username,
            'Firstname': user.Firstname,
            'Lastname': user.Lastname,
            'Email': user.Email,
            'Image': user.Image,
        }

#JWT token refresh bcz I don't like the default method i.e. I made a custom one
class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh_token = attrs.get('refresh')
        try:
            refresh = RefreshToken(refresh_token)
            # Create a new access token
            access_token = str(refresh.access_token)
        except TokenError:
            raise serializers.ValidationError("Invalid or expired refresh token")
        
        return {
            'access': access_token,
        }

#to add acounts, will add API stuff to make it more usable
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id','owner','type' ]
        extra_kwargs = {"owner": {"read_only": True}}
