from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers import (
    ApplicationSerializer,
    CreateApplicationSerializer
)


class ApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    # Get logged-in user's applications
    def get(self, request):
        applications = Application.objects.filter(
            user=request.user
        ).select_related("job")

        serializer = ApplicationSerializer(
            applications,
            many=True
        )

        return Response({
            "success": True,
            "message": "Applications fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    # Apply for a job
    def post(self, request):
        serializer = CreateApplicationSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response({
                "success": True,
                "message": "Application submitted successfully",
                "data": ApplicationSerializer(
                    serializer.instance
                ).data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class ApplicationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    # Delete an application
    def delete(self, request, pk):
        try:
            application = Application.objects.get(
                id=pk,
                user=request.user
            )

            application.delete()

            return Response({
                "success": True,
                "message": "Application withdrawn successfully"
            }, status=status.HTTP_200_OK)

        except Application.DoesNotExist:
            return Response({
                "success": False,
                "message": "Application not found"
            }, status=status.HTTP_404_NOT_FOUND)