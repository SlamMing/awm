from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Post
from rest_framework.test import APIClient
# Create your tests here.
User = get_user_model()

class PostTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='abb', password='password')
        Post.objects.create(description="wewewe01", author=self.user)
    def test_post_created(self):
        post = Post.objects.create(description="wewewe0", author=self.user)
        self.assertEqual(post.id, 2)
    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='password')
        return client
    def test_post_list(self):
        client = self.get_client()
        response = client.get("/api/posts")
        print(response.json())
