from rest_framework import serializers
from .models import SavedJob
from jobs.serializers import JobSerializer


class SavedJobSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)

    class Meta:
        model = SavedJob
        fields = [
            "id",
            "job",
            "saved_at",
        ]
        read_only_fields = ["id", "saved_at"]



class SaveJobSerializer(serializers.ModelSerializer):

    class Meta:
        model = SavedJob
        fields = ["job"]

    def validate(self, attrs):
        user = self.context["request"].user
        job = attrs["job"]

        if SavedJob.objects.filter(user=user, job=job).exists():
            raise serializers.ValidationError(
                {"job": "You have already saved this job."}
            )

        return attrs