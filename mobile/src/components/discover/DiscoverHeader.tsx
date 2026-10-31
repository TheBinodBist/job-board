import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DiscoverHeader() {
  return (
    <View className="flex-row items-center justify-between border-b border-[#E9EDE9] bg-[#F7F9F7] px-6 py-3">
      <View className="flex-row items-center">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#1D4236]">
          <Ionicons name="briefcase-outline" size={25} color="#D6EF62" />
        </View>

        <Text className="ml-3 text-[22px] font-extrabold tracking-tight text-[#1D2924]">
          Job
          <Text className="text-[#78952F]">Board</Text>
        </Text>
      </View>

      <View className="flex-row items-center gap-5">
        <Pressable className="relative">
          <Ionicons name="notifications-outline" size={25} color="#52685F" />
          <View className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#E58B63]" />
        </Pressable>

        <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-[#DDE9D0]">
          <Text className="font-bold text-[#20483B]">BB</Text>
        </Pressable>
      </View>
    </View>
  );
}