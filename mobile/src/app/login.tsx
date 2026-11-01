import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, router } from "expo-router";

import { loginUser } from "@/services/auth";

export default function LoginScreen() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async () => {
    setError("");

    if (!form.username.trim() || !form.password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await loginUser({
        username: form.username.trim(),
        password: form.password,
      });

      router.replace("/discover");
    } catch (requestError) {
      const detail =
        requestError instanceof Error ? requestError.message : String(requestError);
      setError(detail || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#F7F9F7]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center">
          <Text className="text-xs font-bold uppercase tracking-[2px] text-[#78952F]">
            Welcome back
          </Text>
          <Text className="mt-3 text-[34px] font-extrabold tracking-tight text-[#193C32]">
            Log in to your account
          </Text>

          <View className="mt-8 rounded-[28px] border border-[#E3E9E4] bg-white p-5">
            <Text className="text-sm font-bold text-[#193C32]">Username</Text>
            <TextInput
              autoCapitalize="none"
              value={form.username}
              onChangeText={(value) => onChange("username", value)}
              placeholder="Enter your username"
              placeholderTextColor="#90A39A"
              className="mt-2 rounded-2xl border border-[#DDE6E1] bg-[#F8FAF8] px-4 py-3 text-base text-[#193C32]"
            />

            <Text className="mt-5 text-sm font-bold text-[#193C32]">Password</Text>
            <TextInput
              value={form.password}
              onChangeText={(value) => onChange("password", value)}
              placeholder="••••••••"
              placeholderTextColor="#90A39A"
              secureTextEntry
              className="mt-2 rounded-2xl border border-[#DDE6E1] bg-[#F8FAF8] px-4 py-3 text-base text-[#193C32]"
            />

            {error ? (
              <Text className="mt-4 text-sm font-medium text-[#B42318]">{error}</Text>
            ) : null}

            <Pressable
              onPress={onSubmit}
              disabled={isSubmitting}
              className="mt-6 rounded-2xl bg-[#20483B] px-4 py-4"
            >
              {isSubmitting ? (
                <View className="flex-row items-center justify-center gap-2">
                  <ActivityIndicator color="#FFFFFF" />
                  <Text className="text-center font-semibold text-white">
                    Signing in...
                  </Text>
                </View>
              ) : (
                <Text className="text-center font-semibold text-white">Log in</Text>
              )}
            </Pressable>
          </View>

          <Text className="mt-6 text-center text-sm text-[#71877D]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-[#20483B]">
              Sign up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
