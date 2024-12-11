from django.contrib.auth.models import User
from django.utils.timezone import now
from django.db import models
from django import forms

# Create your models here.
class Category(models.Model):
    category_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=256)
    cover = models.CharField(max_length=1024, default="static/img/items.cover.jpeg")
    created = models.DateTimeField(default=now)

    def __str__(self):
        return self.name

class Product(models.Model):
    product_id = models.BigIntegerField(primary_key=True)
    title = models.CharField(max_length=1024)
    price = models.FloatField()
    final_price = models.FloatField()
    author = models.TextField()
    categories = models.ManyToManyField(Category, related_name='products')
    available = models.IntegerField(default=1)
    created = models.DateTimeField(default=now)

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

