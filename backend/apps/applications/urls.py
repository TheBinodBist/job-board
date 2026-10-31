from django.urls import path
from .views import ApplicationView, ApplicationDetailView

urlpatterns = [
    path(
        "/",
        ApplicationView.as_view(),
        name="applications"
    ),

    path(
        "/<int:pk>/",
        ApplicationDetailView.as_view(),
        name="application-detail"
    ),
]