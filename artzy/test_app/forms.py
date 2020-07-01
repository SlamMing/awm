from django import forms
from .models import Post

MAX_LENGTH = 250
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['description']
    def clean_content(self):
        description = self.cleaned_data.get("description")
        if len(description) > MAX_LENGTH:
            raise forms.ValidationError("description is too long! keep it simple.")
        return description