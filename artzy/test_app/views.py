from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.http import HttpResponse, JsonResponse, Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .models import Post
from .forms import PostForm
from .serializers import PostSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def homepage(request, *args, **kwargs):
    return render(request, 'home.html', context={})

@api_view(['POST']) #import selected html client 
def createPost(request, *args, **kwargs):
    serializer = PostSerializer(data = request.POST)
    print(request.POST)
    if serializer.is_valid(raise_exception = True):
        
        serializer.save(author_id=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


def createPost_django(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user=None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    form = PostForm(request.POST or None)
    next_url = request.POST.get("next") or None
    if form.is_valid():
        
        obj = form.save(commit=False)
        obj.user = user
        obj.save()
        if request.is_ajax():
            #serialized to have consistent data
            return JsonResponse(obj.serialize(), status=201)
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = PostForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    return render(request, 'components/forms.html', context ={"form" : form})
@api_view(['GET'])
def getPostbyId(request, post_id, *args, **kwargs):
        qs = Post.objects.filter(id=post_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        serializer = PostSerializer(obj)
        return Response(serializer.data, status=200)

@api_view(['GET'])
def getPosts(request, *args, **kwargs):
     posts = Post.objects.all()
     serializer = PostSerializer(posts, many=True)
     return Response(serializer.data)

def getPosts_django(request, *args, **kwargs):
    #get every post
    data = {
        "response": None
    }
    try:
        posts = Post.objects.all()
        #TODO: struttura post
        posts = [p.serialize() for p in posts]
        data["response"] = posts
    except:
        data['response'] = "error while retrieving posts"
        return JsonResponse(data, status=402)
    return JsonResponse(data, status=200)


def getPostbyId_django(request, tweet_id, *args, **kwargs):
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
