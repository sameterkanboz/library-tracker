import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}
const { width } = Dimensions.get("window");
const MARGIN = 16;
const TAB_BAR_WIDTH = width - 2 * MARGIN;

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);
  getAuth().onAuthStateChanged((user) => {
    setIsLoading(false);
    if (!user) {
      router.replace("/(auth)/");
    }
  });

  if (isLoading) return <Text style={{ paddingTop: 30 }}>Loading...</Text>;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#252525",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: true,
        tabBarStyle: styles.container,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "book" : "book-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "qr-code" : "qr-code-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TAB_BAR_WIDTH,
    height: 84,
    paddingTop: 8,
    alignSelf: "center",
    bottom: MARGIN,
    backgroundColor: "#f5fcff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
