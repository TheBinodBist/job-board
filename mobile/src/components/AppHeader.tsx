import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>JobPortal</Text>

      <View style={styles.actions}>
        <Pressable onPress={() => router.push("/notifications")}>
          <Ionicons name="notifications-outline" size={25} color="#111827" />
        </Pressable>

        <Pressable onPress={() => router.push("/profile" as any)}>
          <Ionicons name="person-circle-outline" size={30} color="#111827" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#2563EB",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
});