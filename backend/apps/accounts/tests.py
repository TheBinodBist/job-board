from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class RegisterViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("user-register")
        self.payload = {
            "username": "newapplicant",
            "first_name": "New",
            "last_name": "Applicant",
            "email": "newapplicant@example.com",
            "password": "Strong!Password2026",
        }

    def test_registration_creates_user_with_hashed_password_and_tokens(self):
        response = self.client.post(self.url, self.payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["user"]["username"], self.payload["username"])
        self.assertNotIn("password", response.data["user"])
        self.assertIn("access", response.data["tokens"])
        self.assertIn("refresh", response.data["tokens"])

        user = get_user_model().objects.get(username=self.payload["username"])
        self.assertNotEqual(user.password, self.payload["password"])
        self.assertTrue(user.check_password(self.payload["password"]))

    def test_registration_rejects_passwords_that_fail_configured_validators(self):
        self.payload["password"] = "password"

        response = self.client.post(self.url, self.payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        self.assertFalse(
            get_user_model().objects.filter(username=self.payload["username"]).exists()
        )

    def test_registration_rejects_duplicate_username(self):
        user_model = get_user_model()
        user_model.objects.create_user(
            username=self.payload["username"],
            email="existing@example.com",
            password="Another!StrongPassword2026",
        )

        response = self.client.post(self.url, self.payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)
