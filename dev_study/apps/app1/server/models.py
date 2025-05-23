# Copyright (C) 2025 Shubham Agarwal
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

