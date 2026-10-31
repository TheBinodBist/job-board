from .serializers import JobsSerializer

from .models import Job
from rest_framework import generics
from rest_framework.permissions import AllowAny

class JobsListView(generics.ListAPIView):
    queryset = Job.objects.all().order_by("-created_at")
    serializer_class = JobsSerializer
    permission_classes = [AllowAny]