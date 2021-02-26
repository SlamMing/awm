from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from accounts.views import (
    login_view,
    logout_view,
    register_view
)
from test_app.views import (
    post_detail_view,
    post_list_view,
    )
#from django.conf.urls import include, url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', post_list_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('<int:post_id>', post_detail_view),
    re_path(r'profiles?/', include('profiles.urls')),
    re_path(r'api/profiles?/', include('profiles.api.urls')),
    path('api/posts/', include('test_app.api.urls'))
    ]

if settings.DEBUG:
    urlpatterns +=  static(settings.STATIC_URL, 
                    document_root=settings.STATIC_ROOT)
    urlpatterns +=  static(settings.MEDIA_URL, 
                    document_root=settings.MEDIA_ROOT)