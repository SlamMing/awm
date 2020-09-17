from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.http import HttpResponse, JsonResponse, Http404
from django.conf import settings

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def homepage(request, *args, **kwargs):
    username= None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, 'pages/home.html', context={"username":username}, status = 200)

def post_list_view(request, *args, **kwargs):
    return render(request, 'posts/list.html')

def post_detail_view(request, post_id, *args, **kwargs):

    return render(request, 'posts/detail.html', context={"post_id": post_id})
