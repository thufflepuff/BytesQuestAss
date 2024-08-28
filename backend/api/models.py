from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
#from django.contrib.auth.hashers import make_password
#from django.core.validators import RegexValidator, MinLengthValidator
class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        
        user = self.model(Username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    Username = models.CharField(max_length=20, unique=True)
    '''
    Password = models.CharField(
        max_length=128,
        validators=[
            MinLengthValidator(8),
            RegexValidator( (p.s. remove the double slsh before d and make it single in case you use it again)
                regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
                message=(
                    "Password must contain at least one uppercase letter, "
                    "one lowercase letter, one number, and one special character."
                ),
                code='invalid_password'
            )
        ]
    )
    '''
    Firstname = models.CharField(max_length=10, default='Raju')
    Lastname = models.CharField(max_length=10, default='Rastogi')
    Email = models.CharField(max_length=50, default='example@email.com')
    Image = models.TextField(default='NULL')

    date_joined = models.DateTimeField(default=timezone.now)

    # Additional fields for Django authentication
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'Username'
    REQUIRED_FIELDS = ['Email', 'Firstname', 'Lastname']

    def __str__(self):
        return self.Username

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