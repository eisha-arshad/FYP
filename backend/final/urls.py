from django.urls import path
from .views import RegisterView, RoleView, MyTokenView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import FilteredUserList




urlpatterns = [
    path('token/', MyTokenView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('get-role/', RoleView.as_view(),name='get-role'),
    path('register/', RegisterView.as_view()),
    path('manage-users/', FilteredUserList.as_view(), name='manage-users'),
    path('manage-users/<int:user_id>/', FilteredUserList.as_view(), name='delete-user'),
    
]
