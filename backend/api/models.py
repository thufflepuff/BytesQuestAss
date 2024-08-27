from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError

class User(models.Model):
    Username = models.CharField(max_length=20)

    Password = models.CharField(
        max_length=20,
        validators=[
            MinLengthValidator(8),  # Minimum length of 8 characters
            RegexValidator(
                regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
                message=(
                    "Password must contain at least one uppercase letter, "
                    "one lowercase letter, one number, and one special character."
                ),
                code='invalid_password'
            )
        ]
    )
    Firstname = models.CharField(max_length=10, default='Raju')
    Lastname = models.CharField(max_length=10, default='Rastogi')
    Email = models.CharField(max_length=50, default='example@email.com')
    Image =  models.TextField(default='NULL')

    def __str__(self):
        return self.Username
    
    @classmethod
    def create_user(cls, username, password, firstname='Raju', lastname='Rastogi', email='example@email.com', image='NULL'):
        if cls.objects.filter(Username=username).exists():
            raise ValidationError(f"A user with the username '{username}' already exists.")

        user = cls(
            Username=username,
            Password=password,
            Firstname=firstname,
            Lastname=lastname,
            Email=email,
            Image=image or 'NULL'  # Use a default image if none is provided
        )

        user.full_clean()

        user.save()

        return user
    
    def check_password(self, raw_password):
            return self.Password == raw_password
    
class Account(models.Model):
    ACCOUNT_TYPES = [
        ('IN', 'INSTAGRAM'),
        ('TW', 'TWITTER'),
        ('RE', 'REDDIT'),
        ('LI', 'LINKEDIN')
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
    type = models.CharField(max_length=2, choices=ACCOUNT_TYPES)
        
    @property
    def Accountname(self):
        return f"{self.owner.username} - {self.type}"

    def __str__(self):
        return self.Accountname