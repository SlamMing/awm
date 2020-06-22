from django.db import models
import datetime

# Create your models here.
class Post(models.Model):
    description = models.TextField(blank=True)
    #painting = models.FileField(upload_to='image/', blank=True)
    like_count = models.IntegerField(default=1)
    author_id = models.IntegerField(default=-1)
    #pub_date = models.DateTimeField(auto_now_add=True, default=datetime.datetime.now())
    comments = []

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(blank=True)
    author_id = models.IntegerField(default=-1)
    #pub_date = models.DateTimeField(auto_now_add=True, default=datetime.datetime.now())
