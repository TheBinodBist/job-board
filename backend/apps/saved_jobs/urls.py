from django.urls import path
from .views import SavedJobView, RemoveSavedJobView

urlpatterns = [
    path(
        "saved-jobs/",
        SavedJobView.as_view(),
        name="saved-jobs"
    ),

    path(
        "saved-jobs/<int:pk>/",
        RemoveSavedJobView.as_view(),
        name="remove-saved-job"
    ),
]