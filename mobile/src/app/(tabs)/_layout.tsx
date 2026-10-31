import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const getIconColor = (color: unknown) =>
  typeof color === "string" ? color : "#2563EB";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 0.5,
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="compass-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="applied"
        options={{
          title: "Applied",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="paper-plane-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="bookmark-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={getIconColor(color)}
            />
          ),
        }}
      />
    </Tabs>
  );
}