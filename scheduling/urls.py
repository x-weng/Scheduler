from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SlotViewSet, CallViewSet, UserViewSet

router = DefaultRouter()
router.register(r'slots', SlotViewSet, basename='slot')
router.register(r'calls', CallViewSet, basename='call')
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
