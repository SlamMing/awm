from django.contrib import admin
from django.urls import path
from .views import (
    getPostbyId,
    homepage,
    getPosts,
    createPost,
    deletePost,
    PostAction)
#from django.conf.urls import include, url

urlpatterns = [
    path('', getPosts),
    path('<int:post_id>/delete/', deletePost),
    path('action/', PostAction),
    path('<int:post_id>/', getPostbyId),
    path('create/', createPost),

    #url(r'', include('test_app.urls')),
]
