import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import type { Job } from "@/components/discover/JobCard";
import { fetchJobs } from "@/services/jobs";

export default function JobDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isValidJobId = Number.isInteger(Number(id)) && Number(id) > 0;

  useEffect(() => {
    let isActive = true;
    const jobId = Number(id);

    if (!isValidJobId) {
      return () => {
        isActive = false;
      };
    }

    fetchJobs()
      .then((jobs) => {
        if (!isActive) return;

        const selectedJob = jobs.find((item) => item.id === jobId);
        if (!selectedJob) {
          setError("This job could not be found.");
          return;
        }

        setJob(selectedJob);
      })
      .catch((requestError: unknown) => {
        if (!isActive) return;

        console.error("Could not load job details:", requestError);
        const detail =
          requestError instanceof Error ? requestError.message : String(requestError);
        setError(`Could not load job details: ${detail}`);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [id, isValidJobId]);

  return (
    <View className="flex-1 bg-[#F7F9F7]">
      <View className="flex-row items-center px-6 pb-4 pt-14">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="arrow-back" size={22} color="#193C32" />
        </Pressable>
        <Text className="ml-4 text-lg font-bold text-[#193C32]">
          Job details
        </Text>
      </View>

      {!isValidJobId ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-sm text-[#71877D]">
            This job could not be found.
          </Text>
        </View>
      ) : isLoading ? (
        <View className="flex-1 items-center justify-center gap-3">
          <ActivityIndicator color="#20483B" />
          <Text className="text-sm text-[#82948B]">Loading job details...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-sm text-[#71877D]">{error}</Text>
        </View>
      ) : job ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 36 }}
        >
          <View className="rounded-[25px] border border-[#E3E9E4] bg-white p-5">
            <View
              style={{ backgroundColor: job.logoColor }}
              className="h-14 w-14 items-center justify-center rounded-2xl"
            >
              <Text className="text-xl font-bold text-[#6040DD]">
                {job.logoText}
              </Text>
            </View>

            <Text className="mt-5 text-2xl font-bold text-[#193C32]">
              {job.title}
            </Text>
            <Text className="mt-2 text-base font-medium text-[#71877D]">
              {job.company}
            </Text>

            <View className="mt-5 flex-row flex-wrap gap-2">
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

            {job.salary ? (
              <Text className="mt-5 font-bold text-[#20483B]">{job.salary}</Text>
            ) : null}
          </View>

          <View className="mt-6 rounded-[25px] border border-[#E3E9E4] bg-white p-5">
            <Text className="text-lg font-bold text-[#193C32]">
              About this role
            </Text>
            <Text className="mt-3 text-sm leading-6 text-[#71877D]">
              {job.description || "No description is available for this job yet."}
            </Text>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}
