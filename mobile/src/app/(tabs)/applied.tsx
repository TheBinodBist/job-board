import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import {
  fetchApplications,
  mapJobRecord,
  type ApplicationRecord,
} from "@/services/jobs";

export default function Applied() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsLoading(true);
      setError(null);

      fetchApplications()
        .then((items) => {
          if (isActive) setApplications(items);
        })
        .catch((requestError: unknown) => {
          if (!isActive) return;

          console.error("Could not load applications:", requestError);
          const detail =
            requestError instanceof Error ? requestError.message : String(requestError);
          setError(`Could not load applications: ${detail}`);
        })
        .finally(() => {
          if (isActive) setIsLoading(false);
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View className="flex-1 bg-[#F7F9F7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <View className="pb-4 pt-14">
          <Text className="text-3xl font-extrabold text-[#193C32]">Applied</Text>
          <Text className="mt-2 text-sm text-[#71877D]">
            Track your applications and next steps
          </Text>
        </View>

        {isLoading ? (
          <View className="items-center gap-3 py-12">
            <ActivityIndicator color="#20483B" />
            <Text className="text-sm text-[#82948B]">Loading applications...</Text>
          </View>
        ) : error ? (
          <View className="items-center rounded-[28px] border border-[#E3E9E4] bg-white p-6">
            <Text className="text-center text-sm text-[#71877D]">{error}</Text>
          </View>
        ) : (
          <>
            <View className="rounded-[28px] border border-[#E3E9E4] bg-white p-5">
              <Text className="text-sm font-bold uppercase tracking-[1.4px] text-[#78952F]">
                Overview
              </Text>
              <View className="mt-4">
                <Text className="text-3xl font-extrabold text-[#193C32]">
                  {applications.length}
                </Text>
                <Text className="mt-1 text-xs uppercase tracking-[1.2px] text-[#71877D]">
                  Total applications
                </Text>
              </View>
            </View>

            {applications.length ? (
              <View className="mt-6">
                {applications.map((application, index) => {
                  const job = mapJobRecord(application.job, index);
                  const appliedDate = new Date(application.created_at);

                  return (
                    <View
                      key={application.id}
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

                        <View className="rounded-full bg-[#EAF3ED] px-3 py-2">
                          <Text className="text-[10px] font-bold text-[#1E5B49]">
                            Submitted
                          </Text>
                        </View>
                      </View>

                      <View className="mt-4 flex-row items-center">
                        <Ionicons name="location-outline" size={14} color="#71877D" />
                        <Text className="ml-2 text-xs text-[#71877D]">
                          {job.location}
                        </Text>
                      </View>

                      <View className="mt-4 flex-row items-center justify-between">
                        <Text className="text-xs text-[#91A199]">
                          Applied {appliedDate.toLocaleDateString()}
                        </Text>
                        <Text
                          accessibilityRole="button"
                          onPress={() =>
                            router.push({
                              pathname: "/jobs/[id]",
                              params: { id: String(job.id) },
                            })
                          }
                          className="text-xs font-medium text-[#20483B]"
                        >
                          View details
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View className="mt-6 items-center rounded-[28px] border border-[#E3E9E4] bg-white p-6">
                <Ionicons name="paper-plane-outline" size={48} color="#BCC8C1" />
                <Text className="mt-4 text-lg font-bold text-[#193C32]">
                  No applications yet
                </Text>
                <Text className="mt-2 text-center text-sm text-[#71877D]">
                  Apply to a job to keep track of it here.
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
