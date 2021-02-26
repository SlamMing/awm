from django.db import models
from django.conf import settings
import datetime
User = settings.AUTH_USER_MODEL

# Create your models here.
class PostLike(models.Model):
    user = models.ForeignKey(User,  on_delete=models.CASCADE)
    post = models.ForeignKey("Post",  on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
class PostQuerySet(models.QuerySet):
    def by_username(self, username):
        return self.filter(author__username__iexact=username)
    def feed(self, user):
        profiles_exist = user.following.exists() 
        #profiles = user.following.all()
        followed_ids = []
        if profiles_exist:
            followed_ids = user.following.values_list("user__id", flat=True)
        return self.filter(
            Q(author__id__in=followed_ids) |
            Q(author=user)
        ).distinct().order_by("-timestamp")

class PostManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return PostQuerySet(self.model, using=self._db)
    def feed(self, user):
        return self.get_queryset().feed(user)
class Post(models.Model):
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    description = models.TextField(blank=True, null=True)
    painting =  models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, related_name="post_author", blank=True, through=PostLike)
    author = models.ForeignKey(User,  on_delete=models.CASCADE, related_name="posts")
    timestamp = models.DateTimeField(auto_now_add=True)
    #pub_date = models.DateTimeField(auto_now_add=True, default=datetime.datetime.now())
    objects = PostManager()
    
    def __str__(self):
        return self.description
    class Meta:
        ordering = ['-id']
    @property
    def is_repost(self):
        return self.parent != None

    def serialize(self):
        return {
                    "description": self.description,
                    "author": self.author.id,

                }

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    #pub_date = models.DateTimeField(auto_now_add=True, default=datetime.datetime.now())
