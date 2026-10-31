import { get } from "@/services/api";
import type { Job } from "@/components/discover/JobCard";

interface JobRecord {
  id: number;
  title: string;
  description: string;
  company: number | string;
  location: string;
}

const logoColors = ["#EEE8FF", "#E2ECFF", "#FFE9DD", "#E2F0E7"];

export async function fetchJobs(): Promise<Job[]> {
  const records = await get<JobRecord[]>("/jobs/jobs/");

  return records.map((record, index) => {
    const company = `Company ${record.company}`;

    return {
      id: record.id,
      title: record.title,
      description: record.description,
      company,
      location: record.location,
      logoColor: logoColors[index % logoColors.length],
      logoText: company.charAt(0),
    };
  });
}