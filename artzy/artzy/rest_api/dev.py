from django.contrib.auth import get_user_model
from rest_framework import authentication

User = get_user_model()
class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
<<<<<<< HEAD
        qs = User.objects.filter(username="adming")
=======
        qs = User.objects.filter(id=1)
>>>>>>> parent of fb65804 (Even more functionalities)
        user = qs.order_by("?").first()
        return (user, None)