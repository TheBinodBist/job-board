from django.db import models
from django.conf import settings

class SavedJob(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_jobs"
    )

    job = models.ForeignKey(
        "jobs.Job",
        on_delete=models.CASCADE,
        related_name="saved_by_users"
    )

    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "saved_jobs"
        unique_together = ("user", "job")
        ordering = ["-saved_at"]

    def __str__(self):
        return f"{self.user} saved {self.job}"