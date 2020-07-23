from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.http import HttpResponse, JsonResponse, Http404

from django.conf import settings
from .models import Post
from .forms import PostForm


ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def homepage(request, *args, **kwargs):
    return render(request, 'home.html', context={})

def createPost(request, *args, **kwargs):
    form = PostForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = PostForm()
    return render(request, 'components/forms.html', context ={"form" : form})
def getPosts(request, *args, **kwargs):
    #get every post
    posts = Post.objects.all()
    #TODO: struttura post
    posts = [{  "id": p.id, 
                "description": p.description,
                "author_id": p.author_id,
                "like_count": p.like_count, } for p in posts]
    data = {
        "response": posts
    }
    return JsonResponse(data)
def getPostbyId(request, tweet_id, *args, **kwargs):
    status = 200
    data = {
        "id": tweet_id,
    }
    try:
        obj = Post.objects.get(id=tweet_id)
    #TODO: struttura post 
        data['description']= obj.description,
        data['author_id']= obj.author_id,
        data['like_count']= obj.like_count,
    except:
        data['message'] = "cerca meglio vez"
        status = 404
    return JsonResponse(data, status = status)
