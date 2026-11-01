import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const stats = [
  { label: "Applications", value: "28" },
  { label: "Saved", value: "12" },
  { label: "Interviews", value: "4" },
  { label: "Response", value: "76%" },
];

const strengths = [
  "Product design",
  "UX strategy",
  "Design systems",
  "Cross-functional leadership",
];

const preferences = [
  "Remote-first",
  "Hybrid",
  "Brand & SaaS",
  "Senior-level",
];

export default function Profile() {
  return (
    <View className="flex-1 bg-[#F7F9F7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <View className="pb-4 pt-14">
          <Text className="text-3xl font-extrabold text-[#193C32]">Profile</Text>
        </View>

        <View className="rounded-[28px] border border-[#E3E9E4] bg-white p-5">
          <View className="flex-row items-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-[#E2ECFF]">
              <Text className="text-2xl font-bold text-[#20483B]">AB</Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-[#193C32]">Ariana Brooks</Text>
              <Text className="mt-1 text-sm text-[#71877D]">
                Senior Product Designer
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={22} color="#71877D" />
          </View>

          <View className="mt-5 flex-row items-center rounded-2xl bg-[#F3F6F3] px-4 py-3">
            <Ionicons name="location-outline" size={18} color="#71877D" />
            <Text className="ml-2 text-sm text-[#71877D]">Seattle, WA</Text>
          </View>
        </View>

        <View className="mt-6 flex-row flex-wrap justify-between">
          {stats.map((stat) => (
            <View
              key={stat.label}
              className="mb-3 w-[48%] rounded-[22px] border border-[#E3E9E4] bg-white p-4"
            >
              <Text className="text-2xl font-extrabold text-[#193C32]">
                {stat.value}
              </Text>
              <Text className="mt-1 text-xs uppercase tracking-[1.2px] text-[#71877D]">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-6 rounded-[28px] border border-[#E3E9E4] bg-white p-5">
          <Text className="text-lg font-bold text-[#193C32]">About me</Text>
          <Text className="mt-3 text-sm leading-6 text-[#71877D]">
            Product designer with 6+ years of experience building elegant interfaces,
            improving onboarding flows, and collaborating closely with engineering and
            growth teams.
          </Text>
        </View>

        <View className="mt-6 rounded-[28px] border border-[#E3E9E4] bg-white p-5">
          <Text className="text-lg font-bold text-[#193C32]">Strengths</Text>
          <View className="mt-4 flex-row flex-wrap">
            {strengths.map((strength) => (
              <View
                key={strength}
                className="mb-2 mr-2 rounded-full bg-[#F3F6F3] px-3 py-2"
              >
                <Text className="text-xs text-[#20483B]">{strength}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 rounded-[28px] border border-[#E3E9E4] bg-white p-5">
          <Text className="text-lg font-bold text-[#193C32]">Job preferences</Text>
          <View className="mt-4 flex-row flex-wrap">
            {preferences.map((preference) => (
              <View
                key={preference}
                className="mb-2 mr-2 rounded-full bg-[#EAF3ED] px-3 py-2"
              >
                <Text className="text-xs text-[#193C32]">{preference}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}