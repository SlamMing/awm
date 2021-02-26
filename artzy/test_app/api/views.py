from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from django.http import HttpResponse, JsonResponse, Http404
from django.contrib.auth.decorators import login_required

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from django.conf import settings
from ..models import Post
from ..forms import PostForm
from ..serializers import PostSerializer, PostActionSerializer, PostCreateSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(['POST']) #import selected html client
#@authentication_classes([SessionAuthentication]) # this is done by default
#@permission_classes([IsAuthenticated]) #rest api for authentication
def createPost(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect('%s/?showLoginRequired=true' % (settings.LOGIN_URL))
    serializer = PostCreateSerializer(data = request.data)
    if serializer.is_valid(raise_exception = True):
        serializer.save(author=request.user)
        return Response(serializer.data, status=201)

    return Response({}, status=400)


@api_view(['GET'])
def getPostbyId(request, post_id, *args, **kwargs):
        qs = Post.objects.filter(id=post_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        serializer = PostSerializer(obj)
        return Response(serializer.data, status=200)


@api_view(['POST'])
#@permission_classes((IsAuthenticated,))
def PostAction(request, *args, **kwargs):
    '''
    action options are like, unlike, share
    '''
    if not request.user.is_authenticated:
        return redirect('%s/?showLoginRequired=true' % (settings.LOGIN_URL))
    serializer = PostActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post_id= data.get("id")
        action = data.get("action")
        desc = data.get("description")
        qs = Post.objects.filter(id=post_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            '''
            if obj.parent is not None:
                
            '''
            serializer = PostSerializer(obj)
            return Response(serializer.data, status=200)
        elif action =="unlike":
            obj.likes.remove(request.user)
            serializer = PostSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "share":
            new_post = Post.objects.create(author=request.user, parent=obj, description=desc)
            serializer = PostSerializer(new_post)
            return Response(serializer.data, status=201)

    return Response({}, status=200)



@api_view(['DELETE', 'POST'])
#@permission_classes((IsAuthenticated,))
def deletePost(request, post_id, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect('%s/?showLoginRequired=true' % (settings.LOGIN_URL))
    qs = Post.objects.filter(id=post_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user = request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this post bro"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Post removed successfully."}, status=200)

from django.db.models import Q #query with more than one filter

def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = PostSerializer(paginated_qs, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
#@permission_classes((IsAuthenticated,))
def post_feed_view(request, *args, **kwargs):
    print(request.session.session_key)
    if not request.user.is_authenticated:
        return redirect('%s/?showLoginRequired=true' % (settings.LOGIN_URL))
    user = request.user
    qs = Post.objects.feed(user)
    return get_paginated_queryset_response(qs, request)


@api_view(['GET'])
def getPosts(request, *args, **kwargs):
    qs = Post.objects.all()
    username = request.GET.get('username')
    if username != None:
        qs = qs.by_username(username)
    return get_paginated_queryset_response(qs, request)



    #django part
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
