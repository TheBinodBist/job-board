import { del, get, post } from "@/services/api";
import type { Job } from "@/components/discover/JobCard";

export interface JobRecord {
  id: number;
  title: string;
  description: string;
  company: number | string | { name: string };
  location: string;
}

export interface SavedJobRecord {
  id: number;
  job: JobRecord;
  saved_at: string;
}

const logoColors = ["#EEE8FF", "#E2ECFF", "#FFE9DD", "#E2F0E7"];

export function mapJobRecord(record: JobRecord, index: number): Job {
  const company =
    typeof record.company === "object"
      ? record.company.name
      : `Company ${record.company}`;

  return {
    id: record.id,
    title: record.title,
    description: record.description,
    company,
    location: record.location,
    logoColor: logoColors[index % logoColors.length],
    logoText: company.charAt(0),
  };
}

export async function fetchJobs(): Promise<Job[]> {
  const records = await get<JobRecord[]>("/jobs/jobs/");
  return records.map(mapJobRecord);
}

export async function fetchSavedJobs(): Promise<SavedJobRecord[]> {
  const response = await get<{ data: SavedJobRecord[] }>("/saved-jobs/");
  return response.data;
}

export async function saveJob(jobId: number): Promise<SavedJobRecord> {
  const response = await post<{ data: SavedJobRecord }>("/saved-jobs/", {
    job: jobId,
  });
  return response.data;
}

export async function removeSavedJob(savedJobId: number): Promise<void> {
  await del(`/saved-jobs/${savedJobId}/`);
}

export interface ApplicationRecord {
  id: number;
  job: JobRecord;
  created_at: string;
  updated_at: string;
}

export async function fetchApplications(): Promise<ApplicationRecord[]> {
  const response = await get<{ data: ApplicationRecord[] }>("/applications/");
  return response.data;
}

export async function applyForJob(jobId: number): Promise<ApplicationRecord> {
  const response = await post<{ data: ApplicationRecord }>("/applications/", {
    job: jobId,
  });
  return response.data;
}