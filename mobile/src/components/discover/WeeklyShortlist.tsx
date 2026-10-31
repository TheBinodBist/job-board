import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WeeklyShortlist() {
  return (
    <View className="rounded-[28px] bg-[#1D4236] p-6">
      <View className="self-start flex-row items-center rounded-full bg-[#355B4D] px-3 py-2">
        <Ionicons name="sparkles-outline" size={15} color="#D6EF62" />
        <Text className="ml-2 text-xs font-bold tracking-wider text-[#D6EF62]">
          YOUR WEEKLY SHORTLIST
        </Text>
      </View>

      <Text className="mt-5 text-[25px] font-bold leading-9 text-white">
        Good work is out there. Let's find your kind of place.
      </Text>

      <Text className="mt-3 text-[15px] leading-6 text-[#B8CDC4]">
        A thoughtful mix of roles from teams that care how they work.
      </Text>

      <Pressable className="mt-6 flex-row items-center">
        <Text className="font-bold text-[#D6EF62]">
          Explore this week's picks
        </Text>

        <Ionicons
          name="arrow-forward"
          size={19}
          color="#D6EF62"
          style={{ marginLeft: 10 }}
        />
      </Pressable>
    </View>
  );
}