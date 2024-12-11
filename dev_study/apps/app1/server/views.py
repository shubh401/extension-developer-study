from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.contrib import messages
from django.template import loader
from django.urls import reverse

from .models import Product, UserUpdateForm, Category
import traceback
import logging
import random
import string
import json

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    filename=f"./logs/server.log",
    filemode="a+"
)
logging.getLogger("urllib3").setLevel(logging.ERROR)

@require_GET
def index(request):
    try:
        csp, nonce = generate_random_csp()
        if not request.user.is_authenticated:
            context = {'nonce': nonce}
            template = loader.get_template('login.html')
            response = HttpResponse(template.render(context, request))
            response["Content-Security-Policy"] = csp
            return response

    
        banners = json.loads(open("./static/data/banners.json").read())
        categories = Category.objects.all()
        context={'categories': categories, 'banners': banners, 'nonce': nonce}
        template = loader.get_template('content.html')
        response = HttpResponse(template.render(context, request))
        response["Content-Security-Policy"] = csp
        return response
    except:
        logging.error("Exception occurred in index(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@require_GET
@login_required
def product(request):
    try:
        csp, nonce = generate_random_csp()
        products = ""
        if 'category' in request.GET:
            category_id = request.GET.get('category', 0)
            try:
                category = Category.objects.get(category_id=category_id)
                products = category.products.all()
            except:
                products = Product.objects.all().order_by('-created')
        elif 'product_id' in request.GET:
            try:
                product_id = int(request.GET.get('product_id', 0))
                products = Product.objects.filter(product_id=product_id)
            except:
                products = Product.objects.all().order_by('-created')
        else:
            products = Product.objects.all().order_by('-created')

        context = {'nonce': nonce, 'products': products}
        template = loader.get_template('product.html')
        response = HttpResponse(template.render(context, request))
        response["Content-Security-Policy"] = csp
        return response
    except:
        logging.error("Exception occurred in product(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@require_GET
def about(request):
    try:
        csp, nonce = generate_random_csp()
        context = {'nonce': nonce}
        template = loader.get_template('about.html')
        response = HttpResponse(template.render(context, request))
        response["Content-Security-Policy"] = csp
        return response
    except:
        logging.error("Exception occurred in about(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@require_GET
@login_required
def cart(request):
    try:
        csp, nonce = generate_random_csp()
        context = {'nonce': nonce}
        template = loader.get_template('cart.html')
        response = HttpResponse(template.render(context, request))
        response["Content-Security-Policy"] = csp
        return response
    except:
        logging.error("Exception occurred in cart(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@login_required
def buy(request):
    try:
        csp, nonce = generate_random_csp()
        context = {'nonce': nonce}
        template = loader.get_template('buy.html')
        response = HttpResponse(template.render(context, request))
        response["Content-Security-Policy"] = csp
        return response
    except:
        logging.error("Exception occurred in buy(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@require_POST
def login_view(request):
    try:
        force_insert_categories()
        force_insert_products()
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            messages.error(request, f'Received Malformed JSON: {str(e)}')
            return HttpResponse('', status=500)
        name = data['username']
        password = data['password']
        if name is None or password is None:
            messages.warning(request, 'Missing Parameters!')
            return HttpResponse('', status=400)
        user = authenticate(request=request, username=name, password=password)
        if user is not None and user.is_active:
            login(request, user)
            return HttpResponse('', status=200)
        messages.warning(request, 'Username/Password mismatch')
        return HttpResponse('', status=400)
    except:
        logging.error("Exception occurred in login_view(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@require_GET
@login_required
def logout_view(request):
    try:
        logout(request)
        return redirect(reverse('index'))
    except:
        logging.error("Exception occurred in logout_view(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@require_POST
def registration_view(request):
    try:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError as e:
            messages.error(request, f'Received Malformed JSON: {str(e)}')
            return HttpResponse('', status=500)
        name = data['username']
        password = data['password']
        if name is None or password is None:
            messages.warning(request, 'Missing Parameters!')
            return HttpResponse('', status=400)
        user = User.objects.create_user(username=name, password=password)
        if user is not None:
            user.save()
            user = authenticate(request=request, username=name, password=password)
            if user is not None and user.is_active:
                login(request, user)
            return HttpResponse('', status=200)
        else:
            messages.warning(request, 'Name is already chosen!')
            return HttpResponse('', status=400)
    except:
        logging.error("Exception occurred in registration_view(): %s\n" % "-".join(traceback.format_exc().split("\n")))

@require_GET
@login_required
def order(request):
    csp, nonce = generate_random_csp()
    product = ""
    if 'productId' in request.GET:
        try:
            product_id = int(request.GET.get('productId', 1))
            product = Product.objects.filter(product_id=product_id)
        except: product = Product.objects.filter(product_id=1)
    else:
        product = Product.objects.filter(product_id=1)

    context = {'nonce': nonce, 'product': product[0]}
    template = loader.get_template('details.html')
    response = HttpResponse(template.render(context, request))
    response["Content-Security-Policy"] = csp
    return response

@login_required
def payment(request):
    csp, nonce = generate_random_csp()
    address_data = {
        'address_line1': request.POST.get('address_line1', ''),
        'address_line2': request.POST.get('address_line2', ''),
        'city': request.POST.get('city', ''),
        'state': request.POST.get('state', ''),
        'pincode': request.POST.get('pincode', ''),
        'language': request.POST.get('language', ''),
        'quantity': request.POST.get('quantity', '')
    }
    request.session['address_data'] = address_data
    product_id = request.GET.get("productId", 1)
    product = Product.objects.get(product_id=product_id)
    context = {'nonce': nonce, "product": product, "address": address_data}

    template = loader.get_template('payment.html')
    response = HttpResponse(template.render(context, request))
    response["Content-Security-Policy"] = csp
    return response

@login_required
def profile(request):
    try:
        csp, nonce = generate_random_csp()
        if request.method == 'POST':
            user_form = UserUpdateForm(request.POST, instance=request.user)
            if user_form.is_valid():
                user_form.save()
                messages.success(request, 'Your profile was successfully updated!')
                return redirect('profile')
            else:
                messages.error(request, 'Please correct the error below.')
        else:
            user_form = UserUpdateForm(instance=request.user)

        context = {'nonce': nonce, 'user_form': user_form}
        template = loader.get_template('profile.html')
        response = HttpResponse(template.render(context, request))
        response["Content-Security-Policy"] = csp
        return response
    except:
        logging.error("Exception occurred in profile(): %s\n" % "-".join(traceback.format_exc().split("\n")))

def force_insert_categories():
    try:
        categories = json.loads(open("./static/data/categories.json").read())
        Category.objects.all().delete()
        for idx, category in enumerate(categories):
            Category.objects.create(category_id=idx+1, name=category["name"], cover=category["cover"])
    except:
        logging.error("Exception occurred in force_insert_categories(): %s\n" % "-".join(traceback.format_exc().split("\n")))

def force_insert_products():
    try:
        products = json.loads(open("./static/data/products.json").read())
        Product.objects.all().delete()
        for idx, product in enumerate(products):
            p = Product.objects.create(product_id=idx+1, title=product["title"], price=float(product["price"]), final_price=float(product["final_price"]), available=int(product["available"]), author=product["author"])
            category_ids = product["category_id"].split(",")
            for idx in category_ids:
                category = Category.objects.get(category_id=idx)
                p.categories.add(category)
    except:
        logging.error("Exception occurred in force_insert_products(): %s\n" % "-".join(traceback.format_exc().split("\n")))

def generate_random_csp():
    try:
        nonce = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
        headers = ["default-src 'none'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   "default-src 'none'; script-src 'self' https:; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   f"default-src 'none'; script-src 'self' 'nonce-{nonce}' 'sha256-hygRG8oEBEyRmhffxB/fOTYCFbRNtZojnqw5SLHmhpo='; style-src 'self' 'unsafe-inline';img-src 'self' data:; frame-src https:; connect-src 'self'; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   f"default-src 'none'; script-src 'self' 'strict-dynamic' 'nonce-{nonce}'; style-src 'self' 'unsafe-inline';img-src 'self' data:; frame-src https:; frame-ancestors 'self'; upgrade-insecure-requests;",
                   "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline';img-src 'self' data:; frame-src https:; frame-ancestors 'self'; upgrade-insecure-requests;",
                   "default-src 'self'; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   "default-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;",
                   "default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https:; connect-src 'self'; img-src 'self' data:; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests;"] 
        return headers[1], nonce
    except:
        logging.error("Exception occurred in generate_random_csp(): %s\n" % "-".join(traceback.format_exc().split("\n")))
