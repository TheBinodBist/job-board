import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import {
  clearAuthSession,
  getAuthUser,
  subscribeToAuthUser,
} from "@/services/auth";

export default function Profile() {
  const [user, setUser] = useState(getAuthUser);
  useEffect(() => subscribeToAuthUser(setUser), []);
  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ");
  const displayName = fullName || user?.username || "Job seeker";
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const signOut = () => {
    clearAuthSession();
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-[#F7F9F7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <View className="pb-4 pt-14">
          <Text className="text-3xl font-extrabold text-[#193C32]">Profile</Text>
        </View>

        {user ? (
          <>
            <View className="rounded-[28px] border border-[#E3E9E4] bg-white p-5">
              <View className="flex-row items-center">
                <View className="h-16 w-16 items-center justify-center rounded-full bg-[#E2ECFF]">
                  <Text className="text-2xl font-bold text-[#20483B]">{initials}</Text>
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-xl font-bold text-[#193C32]">
                    {displayName}
                  </Text>
                  <Text className="mt-1 text-sm text-[#71877D]">
                    @{user.username}
                  </Text>
                </View>
              </View>

              <View className="mt-5 flex-row items-center rounded-2xl bg-[#F3F6F3] px-4 py-3">
                <Ionicons name="mail-outline" size={18} color="#71877D" />
                <Text className="ml-2 flex-1 text-sm text-[#71877D]">
                  {user.email}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={signOut}
              className="mt-6 flex-row items-center justify-center rounded-2xl border border-[#E3E9E4] bg-white px-4 py-4"
            >
              <Ionicons name="log-out-outline" size={20} color="#B42318" />
              <Text className="ml-2 font-semibold text-[#B42318]">Sign out</Text>
            </Pressable>
          </>
        ) : (
          <View className="items-center rounded-[28px] border border-[#E3E9E4] bg-white p-6">
            <Ionicons name="person-circle-outline" size={56} color="#71877D" />
            <Text className="mt-3 text-lg font-bold text-[#193C32]">
              You’re not signed in
            </Text>
            <Text className="mt-2 text-center text-sm leading-6 text-[#71877D]">
              Sign in or create an account to see your profile.
            </Text>
            <Link
              href="/login"
              className="mt-5 rounded-2xl bg-[#20483B] px-6 py-3 font-semibold text-white"
            >
              Log in
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  );
}