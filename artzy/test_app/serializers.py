from rest_framework import serializers
from .models import Post
from django.conf import settings
from profiles.serializers import PublicProfileSerializer

MAX_LENGTH = settings.MAX_POST_LENGTH
POST_ACTION_OPTIONS = settings.POST_ACTION_OPTIONS
class PostActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    description = serializers.CharField(allow_blank=True, required=False)
    def validate_action(self, value):
        value = value.lower().strip()
        if not value in POST_ACTION_OPTIONS:
            raise serializers.ValidationError("this is not a valid action for posts")
        return value

#create serializer
class PostCreateSerializer(serializers.ModelSerializer):
    author = PublicProfileSerializer(source='author.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Post
        fields=['author', 'id',  'description', 'likes', 'timestamp']
    def get_likes(self, obj):
        return obj.likes.count()
    def validate_description(self, value):
        if len(value) > MAX_LENGTH:
            raise serializers.ValidationError("description is too long! keep it simple.")
        return value

#read_only serializer
class PostSerializer(serializers.ModelSerializer):
    author = PublicProfileSerializer(source='author.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    parent = PostCreateSerializer(read_only=True)
    class Meta:
        model=Post
        fields=['author', 'id',  'description', 'likes', 'is_repost', 'parent', 'timestamp']
    def get_likes(self, obj):
        return obj.likes.count()
    
