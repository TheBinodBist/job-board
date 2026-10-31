from django.test import TestCase
from django.urls import reverse

from apps.companies.models import Company
from apps.jobs.models import Job


class JobsListApiTests(TestCase):
	def test_list_returns_existing_jobs(self):
		company = Company.objects.create(
			name="Example Company",
			description="A test company",
			location="Kathmandu",
		)
		job = Job.objects.create(
			title="Backend Engineer",
			description="Build APIs",
			company=company,
			location="Remote",
		)

		response = self.client.get(reverse("jobs-list"))

		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(response.json()), 1)
		self.assertEqual(response.json()[0]["id"], job.id)
		self.assertEqual(response.json()[0]["title"], job.title)
