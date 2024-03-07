import { auth } from "@/config/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import AvatarButton from "@/core/AvatarButton";
import ArrowButton from "@/core/arrowButton";
import Button from "@/core/button";
import { router } from "expo-router";
import { User, deleteUser } from "firebase/auth";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { user } = useAuth();
  const deleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser as User);
      router.replace("/(auth)/");
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text
        style={{
          alignSelf: "flex-start",
          marginLeft: 32,
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Settings
      </Text>

      <AvatarButton
        type="outlined"
        avatarLetter={user?.email?.[0]}
        text={user?.email}
        subtext="Manage Profile"
      />
      <ArrowButton type="outlined">Language Preferences</ArrowButton>
      <ArrowButton type="outlined">Notification Preferences</ArrowButton>
      <ArrowButton type="outlined">App Settings</ArrowButton>
      <ArrowButton type="outlined">Help & Support</ArrowButton>
      <Button type="contained" onPress={() => deleteAccount()}>
        Delete Account
      </Button>
    </SafeAreaView>
  );
};

export default Settings;
