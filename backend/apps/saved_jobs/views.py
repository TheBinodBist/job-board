from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import SavedJob
from .serializers import SavedJobSerializer, SaveJobSerializer


class SavedJobView(APIView):
    permission_classes = [IsAuthenticated]

    # Get all saved jobs
    def get(self, request):
        saved_jobs = SavedJob.objects.filter(
            user=request.user
        ).select_related("job")

        serializer = SavedJobSerializer(
            saved_jobs,
            many=True
        )

        return Response({
            "success": True,
            "message": "Saved jobs fetched successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    # Save a job
    def post(self, request):
        serializer = SaveJobSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response({
                "success": True,
                "message": "Job saved successfully",
                "data": SavedJobSerializer(
                    serializer.instance
                ).data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class RemoveSavedJobView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            saved_job = SavedJob.objects.get(
                id=pk,
                user=request.user
            )

            saved_job.delete()

            return Response({
                "success": True,
                "message": "Job removed from saved jobs"
            }, status=status.HTTP_200_OK)

        except SavedJob.DoesNotExist:
            return Response({
                "success": False,
                "message": "Saved job not found"
            }, status=status.HTTP_404_NOT_FOUND)