import { View, Text, ScrollView } from "react-native";

import DiscoverHeader from "@/components/discover/DiscoverHeader";
import SearchFilterCard from "@/components/discover/SearchFilterCard";
import WeeklyShortlist from "@/components/discover/WeeklyShortlist";
import JobCategories from "@/components/discover/JobCategories";
import JobCard, { Job } from "@/components/discover/JobCard";

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Linear Technologies",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time",
    category: "Design",
    logoColor: "#EEE8FF",
    logoText: "L",
    featured: true,
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Stripe",
    location: "Kathmandu",
    salary: "Rs. 60k - 90k",
    type: "Full-time",
    category: "Engineering",
    logoColor: "#E2ECFF",
    logoText: "S",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Figma",
    location: "Remote",
    salary: "$80k - $110k",
    type: "Full-time",
    category: "Product",
    logoColor: "#FFE9DD",
    logoText: "F",
  },
];

export default function Discover() {
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
              console.log({ keyword, location });
            }}
          />
        </View>

        {/* Weekly shortlist */}
        <View className="mt-9 px-6">
          <WeeklyShortlist />
        </View>

        {/* Categories */}
        <View className="mt-9">
          <JobCategories
            onSelect={(category) => console.log(category)} selectedCategory={""}          />
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

          <View className="gap-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onPress={(selectedJob) => {
                  console.log("Selected:", selectedJob.title);
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}