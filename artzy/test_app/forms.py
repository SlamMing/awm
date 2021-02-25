from django import forms
from .models import Post
from django.conf import settings

MAX_LENGTH = settings.MAX_POST_LENGTH
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['description', 'painting']
    def clean_description(self):
        description = self.cleaned_data.get("description")
        if len(description) > MAX_LENGTH:
            raise forms.ValidationError("description is too long! keep it simple.")
        return description