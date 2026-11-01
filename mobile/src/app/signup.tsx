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

import { registerUser } from "@/services/auth";

export default function SignupScreen() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async () => {
    setError("");

    if (
      !form.first_name.trim() ||
      !form.last_name.trim() ||
      !form.username.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      router.replace("/discover");
    } catch (requestError) {
      const detail =
        requestError instanceof Error ? requestError.message : String(requestError);
      setError(detail || "Unable to create your account right now.");
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
            Create account
          </Text>
          <Text className="mt-3 text-[34px] font-extrabold tracking-tight text-[#193C32]">
            Sign up for JobBoard
          </Text>

          <View className="mt-8 rounded-[28px] border border-[#E3E9E4] bg-white p-5">
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#193C32]">First name</Text>
                <TextInput
                  value={form.first_name}
                  onChangeText={(value) => onChange("first_name", value)}
                  placeholder="First"
                  placeholderTextColor="#90A39A"
                  className="mt-2 rounded-2xl border border-[#DDE6E1] bg-[#F8FAF8] px-4 py-3 text-base text-[#193C32]"
                />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-bold text-[#193C32]">Last name</Text>
                <TextInput
                  value={form.last_name}
                  onChangeText={(value) => onChange("last_name", value)}
                  placeholder="Last"
                  placeholderTextColor="#90A39A"
                  className="mt-2 rounded-2xl border border-[#DDE6E1] bg-[#F8FAF8] px-4 py-3 text-base text-[#193C32]"
                />
              </View>
            </View>

            <Text className="mt-5 text-sm font-bold text-[#193C32]">Username</Text>
            <TextInput
              autoCapitalize="none"
              value={form.username}
              onChangeText={(value) => onChange("username", value)}
              placeholder="Choose a username"
              placeholderTextColor="#90A39A"
              className="mt-2 rounded-2xl border border-[#DDE6E1] bg-[#F8FAF8] px-4 py-3 text-base text-[#193C32]"
            />

            <Text className="mt-5 text-sm font-bold text-[#193C32]">Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={form.email}
              onChangeText={(value) => onChange("email", value)}
              placeholder="you@example.com"
              placeholderTextColor="#90A39A"
              className="mt-2 rounded-2xl border border-[#DDE6E1] bg-[#F8FAF8] px-4 py-3 text-base text-[#193C32]"
            />

            <Text className="mt-5 text-sm font-bold text-[#193C32]">Password</Text>
            <TextInput
              value={form.password}
              onChangeText={(value) => onChange("password", value)}
              placeholder="At least 8 characters"
              placeholderTextColor="#90A39A"
              secureTextEntry
              className="mt-2 rounded-2xl border border-[#DDE6E1] bg-[#F8FAF8] px-4 py-3 text-base text-[#193C32]"
            />

            <Text className="mt-5 text-sm font-bold text-[#193C32]">Confirm password</Text>
            <TextInput
              value={form.confirmPassword}
              onChangeText={(value) => onChange("confirmPassword", value)}
              placeholder="Repeat your password"
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
                    Creating account...
                  </Text>
                </View>
              ) : (
                <Text className="text-center font-semibold text-white">Sign up</Text>
              )}
            </Pressable>
          </View>

          <Text className="mt-6 text-center text-sm text-[#71877D]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#20483B]">
              Log in
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
