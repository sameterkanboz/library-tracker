import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "welcome",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "settings",
        }}
      />
    </Stack>
  );
}
