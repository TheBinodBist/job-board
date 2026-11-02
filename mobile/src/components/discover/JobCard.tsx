import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description?: string;
  salary?: string;
  type?: string;
  category?: string;
  logoColor: string;
  logoText: string;
  featured?: boolean;
}

interface Props {
  job: Job;
  onPress?: (job: Job) => void;
  isSaved: boolean;
  isSaving: boolean;
  onToggleSaved: (job: Job) => void;
}

export default function JobCard({
  job,
  onPress,
  isSaved,
  isSaving,
  onToggleSaved,
}: Props) {
  return (
    <Pressable
      onPress={() => onPress?.(job)}
      className="rounded-[25px] border border-[#E3E9E4] bg-white p-5"
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

          {job.description ? (
            <Text className="mt-2 text-sm leading-5 text-[#82948B]" numberOfLines={2}>
              {job.description}
            </Text>
          ) : null}

          {job.featured && (
            <View className="mt-2 self-start rounded-md bg-[#F0F5DF] px-2 py-1">
              <Text className="text-[10px] font-bold text-[#78952F]">
                FEATURED
              </Text>
            </View>
          )}
        </View>

        <Pressable
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? "Remove saved job" : "Save job"}
          disabled={isSaving}
          onPress={(event) => {
            event.stopPropagation();
            onToggleSaved(job);
          }}
        >
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={23}
            color={isSaved ? "#20483B" : "#91A199"}
          />
        </Pressable>
      </View>

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

      {job.salary || job.category ? (
        <View className="mt-4 flex-row items-center justify-between">
          {job.salary ? (
            <Text className="font-bold text-[#20483B]">{job.salary}</Text>
          ) : null}

          {job.category ? (
            <Text className="text-xs text-[#91A199]">{job.category}</Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}