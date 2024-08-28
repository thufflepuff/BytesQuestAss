from django.contrib import admin
from .models import User, Account

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
 list_display = ['id','Firstname','Lastname', 'Username', 'password', 'Email', 'Image']
admin.site.register(Account)