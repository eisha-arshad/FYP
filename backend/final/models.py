from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('student', 'Student'),
        ('supervisor', 'Supervisor'),
    )
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    department = models.CharField(max_length=50, default='Unknown')
    program = models.CharField(max_length=50, default='N/A')
    registration_id = models.CharField(max_length=50, default='TEMP')
    full_name = models.CharField(max_length=100, default='Unnamed User')


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Required by Django, even if not used

    def __str__(self):
        return self.email
