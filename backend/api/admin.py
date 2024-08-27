from django.contrib import admin
from .models import User, Account

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
 list_display = ['id','Firstname','Lastname', 'Username', 'Password', 'Image', 'Email']
admin.site.register(Account)