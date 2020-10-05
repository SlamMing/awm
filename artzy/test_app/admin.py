from django.contrib import admin
from .models import Post, Comment, PostLike


class PostLikeAdmin(admin.TabularInline):
    model = PostLike

class PostSearch(admin.ModelAdmin):
    inlines = [PostLikeAdmin]
    list_display = ['__str__', 'author_id']
    search_fields = ['description', 'author__username', 'author__email']
    class Meta:
        model = Post
# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)
