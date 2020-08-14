from django.db import models
from django.conf import settings
import datetime
User = settings.AUTH_USER_MODEL
# Create your models here.
class Post(models.Model):
    description = models.TextField(blank=True)
    painting = models.FileField(upload_to='image/', blank=True)
    like_count = models.IntegerField(default=1)
    author_id = models.ForeignKey(User,  on_delete=models.CASCADE)
    #pub_date = models.DateTimeField(auto_now_add=True, default=datetime.datetime.now())
    comments = []
    def __str__(self):
        return self.description
    class Meta:
        ordering = ['-id']
    def serialize(self):
        return {
                    "description": self.description,
                    "author_id": self.author_id.id,
                    "like_count": self.like_count
                }

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(blank=True)
    author_id = models.IntegerField(default=-1)
    #pub_date = models.DateTimeField(auto_now_add=True, default=datetime.datetime.now())
