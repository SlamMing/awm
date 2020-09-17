from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Post
from rest_framework.test import APIClient
# Create your tests here.
User = get_user_model()

class PostTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='abb', password='password')
        self.userb = User.objects.create_user(username='abc', password='password')
        Post.objects.create(description="wewewe01", author=self.user)
        Post.objects.create(description="wewewe02", author=self.user)
    def test_post_created(self):
        post = Post.objects.create(description="wewewe0", author=self.user)
        self.assertEqual(post.id, 3)
    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='password')
        return client
    def test_post_list(self):
        client = self.get_client()
        response = client.get("/api/posts")
        print(response.json())
    def test_action_like(self):
        client = self.get_client()

        response = client.get(  "/api/posts/action/", 
                                {"id": 1, "action": "like"})
        self.assertEqual(response.status_code, 200)

        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)

        user = self.user
        like_instances_count = user.postlike_set.count()
        self.assertEqual(like_instances_count, 1)
        related_likes = user.post_user.count()
        self.assertEqual(like_instances_count, related_likes)

    def test_posts_related_name(self):
        user = self.user
        self.assertEqual(user.posts.count(), 2)