from rest_framework import serializers
from .models import Post
from django.conf import settings

MAX_LENGTH = settings.MAX_POST_LENGTH

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=['description']

    def validate_description(self, value):
        if len(value) > MAX_LENGTH:
            raise serializers.ValidationError("description is too long! keep it simple.")
        return value