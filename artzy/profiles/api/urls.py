from django.contrib import admin
from django.urls import path
from django.conf import settings

from .views import (user_follow_view)
#base EndPoint /api/profiles

urlpatterns = [
    path('<str:username>/follow', user_follow_view),
   

    #url(r'', include('test_app.urls')),
]
