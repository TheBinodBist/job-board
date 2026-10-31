from django.urls import path


from .views import JobsListView

urlpatterns = [
    path(
        "jobs/",
        JobsListView.as_view(),
        name="jobs-list"
    ),

    path(
        "jobs/<int:pk>/",
        JobsListView.as_view(),
        name="jobs-list"
    ),
]