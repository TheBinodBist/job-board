from rest_framework import serializers
from .models import Job


class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["__all__"]
        read_only_fields = fields