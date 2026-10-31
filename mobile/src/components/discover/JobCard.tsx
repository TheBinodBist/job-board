import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
  logoColor: string;
  logoText: string;
  featured?: boolean;
}

interface Props {
  job: Job;
  onPress?: (job: Job) => void;
}

export default function JobCard({ job, onPress }: Props) {
  const [saved, setSaved] = useState(false);

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
          onPress={() => setSaved(!saved)}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={23}
            color={saved ? "#20483B" : "#91A199"}
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

        <View className="rounded-full bg-[#F3F6F3] px-3 py-2">
          <Text className="text-xs text-[#71877D]">{job.type}</Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <Text className="font-bold text-[#20483B]">
          {job.salary}
        </Text>

        <Text className="text-xs text-[#91A199]">
          {job.category}
        </Text>
      </View>
    </Pressable>
  );
}