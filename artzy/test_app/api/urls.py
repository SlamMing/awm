from django.contrib import admin
from django.urls import path
from django.conf import settings

from .views import (
    getPostbyId,
    getPosts,
    createPost,
    deletePost,
    PostAction,
    post_feed_view
    )
#from django.conf.urls import include, url

urlpatterns = [
    path('', getPosts),
    path('feed/', post_feed_view),
    path('<int:post_id>/delete/', deletePost),
    path('action/', PostAction),
    path('<int:post_id>/', getPostbyId),
    path('create/', createPost),


    #url(r'', include('test_app.urls')),
]
