import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import {
  fetchSavedJobs,
  mapJobRecord,
  removeSavedJob,
  type SavedJobRecord,
} from "@/services/jobs";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJobRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsLoading(true);
      setError(null);

      fetchSavedJobs()
        .then((jobs) => {
          if (isActive) setSavedJobs(jobs);
        })
        .catch((requestError: unknown) => {
          if (!isActive) return;

          console.error("Could not load saved jobs:", requestError);
          const detail =
            requestError instanceof Error ? requestError.message : String(requestError);
          setError(`Could not load saved jobs: ${detail}`);
        })
        .finally(() => {
          if (isActive) setIsLoading(false);
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  const removeJob = async (savedJobId: number) => {
    setRemovingId(savedJobId);
    try {
      await removeSavedJob(savedJobId);
      setSavedJobs((current) => current.filter((savedJob) => savedJob.id !== savedJobId));
    } catch (requestError) {
      const detail =
        requestError instanceof Error ? requestError.message : String(requestError);
      Alert.alert("Could not remove saved job", detail);
    } finally {
      setRemovingId(null);
    }
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
      ) : error ? (
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
          {savedJobs.map((savedJob, index) => {
            const job = mapJobRecord(savedJob.job, index);

            return (
              <Pressable
                key={savedJob.id}
                onPress={() =>
                  router.push({
                    pathname: "/jobs/[id]",
                    params: { id: String(job.id) },
                  })
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
                    accessibilityRole="button"
                    accessibilityLabel="Remove saved job"
                    disabled={removingId === savedJob.id}
                    hitSlop={10}
                    onPress={(event) => {
                      event.stopPropagation();
                      void removeJob(savedJob.id);
                    }}
                  >
                    <Ionicons name="bookmark" size={22} color="#20483B" />
                  </Pressable>
                </View>

                <Text className="mt-4 text-sm leading-6 text-[#71877D]">
                  {job.description}
                </Text>

                <View className="mt-4 flex-row items-center">
                  <Ionicons name="location-outline" size={14} color="#71877D" />
                  <Text className="ml-1 text-xs text-[#71877D]">{job.location}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
