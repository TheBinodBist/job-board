from rest_framework import serializers
from .models import Application
from apps.jobs.serializers import JobsSerializer


class ApplicationSerializer(serializers.ModelSerializer):
    job = JobsSerializer(read_only=True)

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class CreateApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = ["job"]

    def validate(self, attrs):
        user = self.context["request"].user
        job = attrs["job"]

        if Application.objects.filter(user=user, job=job).exists():
            raise serializers.ValidationError(
                "You have already applied for this job."
            )

        return attrs