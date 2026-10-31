from django.test import TestCase
from rest_framework.test import APIClient

from .models import Category


class CategoryApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(
            name="Engineering",
            description="Engineering roles",
        )

    def test_list_categories(self):
        response = self.client.get("/api/v1/categories/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data[0]["name"],
            self.category.name,
        )

    def test_retrieve_category(self):
        response = self.client.get(f"/api/v1/categories/{self.category.id}/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], self.category.name)
        self.assertEqual(response.data["description"], self.category.description)
