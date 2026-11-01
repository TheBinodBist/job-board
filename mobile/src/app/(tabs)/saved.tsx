import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import type { Job } from "@/components/discover/JobCard";
import { fetchJobs } from "@/services/jobs";

const savedJobFallbacks = [
  {
    id: 101,
    title: "Senior Product Designer",
    company: "Northstar Studio",
    location: "Remote · US",
    salary: "$145k - $170k",
    type: "Full-time",
    description:
      "Design multi-platform experiences for our growing B2B SaaS product suite.",
    category: "Design",
    logoColor: "#EEE8FF",
    logoText: "N",
  },
  {
    id: 102,
    title: "Frontend Engineer",
    company: "Lumina Labs",
    location: "Austin, TX",
    salary: "$128k - $150k",
    type: "Hybrid",
    description:
      "Build polished interfaces and lead the improvement of our customer dashboard experience.",
    category: "Engineering",
    logoColor: "#E2ECFF",
    logoText: "L",
  },
  {
    id: 103,
    title: "Product Marketing Manager",
    company: "Harbor Works",
    location: "New York, NY",
    salary: "$120k - $140k",
    type: "Full-time",
    description:
      "Shape launch narratives and partner with product and lifecycle teams on go-to-market strategy.",
    category: "Marketing",
    logoColor: "#FFE9DD",
    logoText: "H",
  },
] as const satisfies Partial<Job>[];

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    fetchJobs()
      .then((jobs) => {
        if (!isActive) return;

        const fallbackJobs = savedJobFallbacks.map((job, index) => {
          const source = jobs[index] ?? jobs[0];

          return {
            ...source,
            ...job,
            id: Number(job.id ?? source?.id ?? index + 1),
            title: job.title ?? source?.title ?? "Saved role",
            company: job.company ?? source?.company ?? "Saved company",
            location: job.location ?? source?.location ?? "Remote",
            salary: job.salary ?? source?.salary ?? "$120k - $150k",
            type: job.type ?? source?.type ?? "Full-time",
            description: job.description ?? source?.description ?? "Saved role description",
            category: job.category ?? source?.category ?? "General",
            logoColor: job.logoColor ?? source?.logoColor ?? "#E2F0E7",
            logoText: job.logoText ?? source?.logoText ?? "S",
          } satisfies Job;
        });

        setSavedJobs(fallbackJobs);
      })
      .catch((requestError: unknown) => {
        if (!isActive) return;

        console.error("Could not load saved jobs:", requestError);
        const detail =
          requestError instanceof Error ? requestError.message : String(requestError);
        setError(`Could not load saved jobs: ${detail}`);
        setSavedJobs(savedJobFallbacks.map((job, index) => ({
          ...job,
          id: Number(job.id ?? index + 1),
          title: job.title ?? "Saved role",
          company: job.company ?? "Saved company",
          location: job.location ?? "Remote",
          salary: job.salary ?? "$120k - $150k",
          type: job.type ?? "Full-time",
          description: job.description ?? "Saved role description",
          category: job.category ?? "General",
          logoColor: job.logoColor ?? "#E2F0E7",
          logoText: job.logoText ?? "S",
        })));
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const removeSavedJob = (jobId: number) => {
    setSavedJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId));
  };

  return (
    <View className="flex-1 bg-[#F7F9F7]">
      <View className="px-6 pb-4 pt-14">
        <Text className="text-3xl font-extrabold text-[#193C32]">Saved jobs</Text>
        <Text className="mt-2 text-sm text-[#71877D]">
          {savedJobs.length} opportunities waiting for you
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center gap-3">
          <ActivityIndicator color="#20483B" />
          <Text className="text-sm text-[#82948B]">Loading saved jobs...</Text>
        </View>
      ) : error && !savedJobs.length ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-sm text-[#71877D]">{error}</Text>
        </View>
      ) : !savedJobs.length ? (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="bookmark-outline" size={52} color="#BCC8C1" />
          <Text className="mt-4 text-lg font-bold text-[#193C32]">
            No saved jobs yet
          </Text>
          <Text className="mt-2 text-center text-sm text-[#71877D]">
            Tap the bookmark on any role to save it here.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}
        >
          {savedJobs.map((job) => (
            <Pressable
              key={job.id}
              onPress={() =>
                router.push({ pathname: "/jobs/[id]", params: { id: String(job.id) } })
              }
              className="mb-4 rounded-[25px] border border-[#E3E9E4] bg-white p-5"
            >
              <View className="flex-row items-start">
                <View
                  style={{ backgroundColor: job.logoColor }}
                  className="h-14 w-14 items-center justify-center rounded-2xl"
                >
                  <Text className="text-xl font-bold text-[#6040DD]">
                    {job.logoText}
                  </Text>
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-base font-bold text-[#193C32]">
                    {job.title}
                  </Text>
                  <Text className="mt-1 text-sm font-medium text-[#71877D]">
                    {job.company}
                  </Text>
                </View>

                <Pressable
                  hitSlop={10}
                  onPress={(event) => {
                    event.stopPropagation();
                    removeSavedJob(job.id);
                  }}
                >
                  <Ionicons name="bookmark" size={22} color="#20483B" />
                </Pressable>
              </View>

              <Text className="mt-4 text-sm leading-6 text-[#71877D]">
                {job.description}
              </Text>

              <View className="mt-4 flex-row flex-wrap gap-2">
                <View className="flex-row items-center rounded-full bg-[#F3F6F3] px-3 py-2">
                  <Ionicons name="location-outline" size={14} color="#71877D" />
                  <Text className="ml-1 text-xs text-[#71877D]">
                    {job.location}
                  </Text>
                </View>

                {job.type ? (
                  <View className="rounded-full bg-[#F3F6F3] px-3 py-2">
                    <Text className="text-xs text-[#71877D]">{job.type}</Text>
                  </View>
                ) : null}
              </View>

              <View className="mt-5 flex-row items-center justify-between">
                <Text className="font-bold text-[#20483B]">{job.salary}</Text>
                <Text className="text-xs text-[#91A199]">{job.category}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}