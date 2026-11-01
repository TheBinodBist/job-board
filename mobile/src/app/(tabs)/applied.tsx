import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const applications = [
  {
    company: "Northstar Studio",
    role: "Senior Product Designer",
    status: "Interviewing",
    date: "Applied 3 days ago",
    location: "Remote · US",
    color: "#EEE8FF",
    accent: "N",
  },
  {
    company: "Lumina Labs",
    role: "Frontend Engineer",
    status: "In review",
    date: "Applied 1 week ago",
    location: "Austin, TX",
    color: "#E2ECFF",
    accent: "L",
  },
  {
    company: "Harbor Works",
    role: "Product Marketing Manager",
    status: "Offer received",
    date: "Applied 2 weeks ago",
    location: "New York, NY",
    color: "#FFE9DD",
    accent: "H",
  },
];

const statusStyles = {
  Interviewing: "bg-[#EAF3ED]",
  "In review": "bg-[#F0F5DF]",
  "Offer received": "bg-[#EDE9FF]",
} as const;

const statusTextColors = {
  Interviewing: "text-[#1E5B49]",
  "In review": "text-[#5E6B2E]",
  "Offer received": "text-[#4C3DB8]",
} as const;

export default function Applied() {
  return (
    <View className="flex-1 bg-[#F7F9F7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <View className="pb-4 pt-14">
          <Text className="text-3xl font-extrabold text-[#193C32]">Applied</Text>
          <Text className="mt-2 text-sm text-[#71877D]">
            Track your progress and next steps
          </Text>
        </View>

        <View className="rounded-[28px] border border-[#E3E9E4] bg-white p-5">
          <Text className="text-sm font-bold uppercase tracking-[1.4px] text-[#78952F]">
            Overview
          </Text>

          <View className="mt-4 flex-row items-center justify-between">
            <View>
              <Text className="text-3xl font-extrabold text-[#193C32]">28</Text>
              <Text className="mt-1 text-xs uppercase tracking-[1.2px] text-[#71877D]">
                Total applications
              </Text>
            </View>

            <View className="rounded-2xl bg-[#EAF3ED] px-3 py-2">
              <Text className="text-sm font-bold text-[#20483B]">+12% this month</Text>
            </View>
          </View>
        </View>

        <View className="mt-6">
          {applications.map((application) => (
            <View
              key={`${application.company}-${application.role}`}
              className="mb-4 rounded-[25px] border border-[#E3E9E4] bg-white p-5"
            >
              <View className="flex-row items-start">
                <View
                  style={{ backgroundColor: application.color }}
                  className="h-14 w-14 items-center justify-center rounded-2xl"
                >
                  <Text className="text-xl font-bold text-[#6040DD]">
                    {application.accent}
                  </Text>
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-base font-bold text-[#193C32]">
                    {application.role}
                  </Text>
                  <Text className="mt-1 text-sm font-medium text-[#71877D]">
                    {application.company}
                  </Text>
                </View>

                <View
                  className={`rounded-full px-3 py-2 ${statusStyles[application.status as keyof typeof statusStyles]}`}
                >
                  <Text
                    className={`text-[10px] font-bold ${statusTextColors[application.status as keyof typeof statusTextColors]}`}
                  >
                    {application.status}
                  </Text>
                </View>
              </View>

              <View className="mt-4 flex-row items-center">
                <Ionicons name="location-outline" size={14} color="#71877D" />
                <Text className="ml-2 text-xs text-[#71877D]">{application.location}</Text>
              </View>

              <View className="mt-4 flex-row items-center justify-between">
                <Text className="text-xs text-[#91A199]">{application.date}</Text>
                <Text className="text-xs font-medium text-[#20483B]">View details</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
