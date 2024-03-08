import { auth } from "@/config/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

import ArrowButton from "@/core/arrowButton";
import AvatarButton from "@/core/avatarButton";
import Button from "@/core/button";
import Header from "@/core/header";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { User, deleteUser } from "firebase/auth";
import React from "react";
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
      <Header title="Settings" />

      <AvatarButton
        type="outlined"
        avatarLetter={user?.email?.[0]}
        text={user?.email}
        subtext="Manage Profile"
      />
      <ArrowButton disabled type="outlined">
        Language Preferences
      </ArrowButton>
      <ArrowButton disabled type="outlined">
        Notification Preferences
      </ArrowButton>
      <ArrowButton disabled type="outlined">
        App Settings
      </ArrowButton>
      <ArrowButton
        onPress={() => Linking.openURL("https://twitter.com/sameterkanboz")}
        type="outlined"
      >
        Help & Support
      </ArrowButton>
      <Button type="contained" onPress={() => deleteAccount()}>
        Delete Account
      </Button>
    </SafeAreaView>
  );
};

export default Settings;
