from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.registration_view, name='register'),
    path('cart', views.cart, name='cart'),
    path('buy', views.buy, name='buy'),
    path('payment', views.payment, name='payment'),
    path('order', views.order, name='order'),
    path('products', views.product, name='product'),
    path('about', views.about, name='about'),
    path('profile', views.profile, name='profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)