from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .models import CustomUser
from .serializers import RegisterSerializer, CustomTokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from rest_framework_simplejwt.views import TokenObtainPairView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class MyTokenView(TokenObtainPairView):
    pass



class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer

# class RoleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"role": request.user.role})
class RoleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        print("Logged-in user:", user, "→ role:", getattr(user, "role", None))

        if not user or not hasattr(user, 'role'):
            return Response(
                {"error": "User not authenticated or role not found."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response({"role": user.role or ""}, status=status.HTTP_200_OK)




from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser
from .serializers import RegisterSerializer
from rest_framework import status

from .serializers import UserListSerializer  # Import new serializer

class FilteredUserList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        if current_user.role != "admin":
            return Response({"error": "Only admins can view users."}, status=status.HTTP_403_FORBIDDEN)

        department = current_user.department
        users = CustomUser.objects.filter(department=department).exclude(role='admin')
        serialized = UserListSerializer(users, many=True)  # use new serializer here
        return Response(serialized.data, status=status.HTTP_200_OK)

    def delete(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            if request.user.role != "admin" or request.user.department != user.department:
                return Response({"error": "Unauthorized"}, status=403)
            user.delete()
            return Response({"message": "User deleted"}, status=204)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
