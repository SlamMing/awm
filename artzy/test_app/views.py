from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Post
# Create your views here.
def homepage(request, *args, **kwargs):
    return render(request, 'home.html', context={})
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
