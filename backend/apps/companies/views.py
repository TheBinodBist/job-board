from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Company
from .serializers import CompanySerializer


class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all().order_by("-created_at")
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]


class CompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]
    lookup_field = "id"