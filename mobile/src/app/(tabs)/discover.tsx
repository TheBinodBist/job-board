import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View, Text, ScrollView } from "react-native";
import { router } from "expo-router";

import DiscoverHeader from "@/components/discover/DiscoverHeader";
import SearchFilterCard from "@/components/discover/SearchFilterCard";
import WeeklyShortlist from "@/components/discover/WeeklyShortlist";
import JobCategories from "@/components/discover/JobCategories";
import JobCard, { Job } from "@/components/discover/JobCard";
import { fetchJobs } from "@/services/jobs";

export default function Discover() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Anywhere");
  const [selectedCategory, setSelectedCategory] = useState("All jobs");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    fetchJobs()
      .then((loadedJobs) => {
        if (isActive) setJobs(loadedJobs);
      })
      .catch((requestError: unknown) => {
        if (!isActive) return;

        console.error("Could not load jobs:", requestError);
        const detail =
          requestError instanceof Error ? requestError.message : String(requestError);
        setError(`Could not load jobs: ${detail}`);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [reloadCount]);

  const normalizedKeyword = keyword.trim().toLowerCase();
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword =
      !normalizedKeyword ||
      [job.title, job.company, job.description]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedKeyword));
    const matchesLocation =
      location === "Anywhere" ||
      job.location.toLowerCase().includes(location.toLowerCase());
    const matchesCategory =
      selectedCategory === "All jobs" ||
      job.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesKeyword && matchesLocation && matchesCategory;
  });

  return (
    <View className="flex-1 bg-[#F7F9F7]">
      <DiscoverHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Hero */}
        <View className="px-6 pb-6 pt-10">
          <Text className="text-xs font-bold tracking-[2px] text-[#78952F]">
            ✧ A BETTER KIND OF JOB SEARCH
          </Text>

          <Text className="mt-3 text-[38px] font-extrabold leading-[44px] tracking-tight text-[#193C32]">
            Find your next thing.
          </Text>

          <Text className="mt-4 text-base leading-7 text-[#82948B]">
            Good work, with good people. Your next chapter starts here.
          </Text>
        </View>

        {/* Search */}
        <View className="px-6">
          <SearchFilterCard
            onSearch={(keyword, location) => {
              setKeyword(keyword);
              setLocation(location);
            }}
          />
        </View>

        Weekly shortlist
        <View className="mt-9 px-6">
          <WeeklyShortlist />
        </View>

        {/* Categories */}
        <View className="mt-9">
          <JobCategories
            onSelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </View>

        {/* Recommended jobs */}
        <View className="mt-9 px-6">
          <View className="mb-5">
            <Text className="text-[22px] font-bold text-[#193C32]">
              Recommended for you
            </Text>

            <Text className="mt-2 text-sm text-[#82948B]">
              Handpicked based on your interests
            </Text>
          </View>

          {isLoading ? (
            <View className="items-center gap-3 py-8">
              <ActivityIndicator color="#20483B" />
              <Text className="text-sm text-[#82948B]">Loading jobs...</Text>
            </View>
          ) : error ? (
            <View className="items-center gap-3 py-8">
              <Text className="text-center text-sm text-[#71877D]">{error}</Text>
              <Pressable
                onPress={() => {
                  setIsLoading(true);
                  setError(null);
                  setReloadCount((count) => count + 1);
                }}
                className="rounded-xl bg-[#20483B] px-5 py-3"
              >
                <Text className="font-semibold text-white">Try again</Text>
              </Pressable>
            </View>
          ) : filteredJobs.length ? (
            <View className="gap-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onPress={(selectedJob) =>
                    router.push({
                      pathname: "/jobs/[id]",
                      params: { id: selectedJob.id },
                    })
                  }
                />
              ))}
            </View>
          ) : (
            <Text className="py-8 text-center text-sm text-[#82948B]">
              {jobs.length ? "No jobs match these filters." : "No jobs available yet."}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}