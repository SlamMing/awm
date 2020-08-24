from rest_framework import serializers
from .models import Post
from django.conf import settings

MAX_LENGTH = settings.MAX_POST_LENGTH
POST_ACTION_OPTIONS = settings.POST_ACTION_OPTIONS
class PostActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in POST_ACTION_OPTIONS:
            raise serializers.ValidationError("this is not a valid action for posts")
        return value
class PostSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Post
        fields=['id', 'description', 'likes']
    def get_likes(self, obj):
        return obj.likes.count()
    def validate_description(self, value):
        if len(value) > MAX_LENGTH:
            raise serializers.ValidationError("description is too long! keep it simple.")
        return value
