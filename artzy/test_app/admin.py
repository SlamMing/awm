from django.contrib import admin
from .models import Post, Comment




class PostSearch(admin.ModelAdmin):
    list_display = ['__str__', 'author_id']
    search_fields = ['description', 'user__username', 'user__email']
    class Meta:
        model = Post
# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)