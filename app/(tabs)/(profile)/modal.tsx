import { auth } from "@/config/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import Button from "@/core/button";
import { Textfield } from "@/core/textfield";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { User, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Modal = () => {
  const router = useNavigation();
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const update = async (data: { displayName: string | null | undefined }) => {
    try {
      await updateProfile(auth.currentUser as User, data);
      alert("Profile updated successfully");
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.25)" },
        ]}
        onPress={() => router.goBack()}
      />
      <View
        style={{
          width: "70%",
          height: "30%",
          backgroundColor: "#f8f8f8",
          borderRadius: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <FontAwesome5 name="edit" size={32} color="#252525" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#252525",
          }}
        >
          Edit Display Name
        </Text>
        <Textfield
          placeholder={user?.displayName || "Edit Name"}
          onChangeText={(val) => setDisplayName(val)}
          value={displayName}
          style={{
            height: 40,
          }}
        />
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              height: 48,
              width: "45%",
            }}
            type="outlined"
            onPress={() => router.goBack()}
          >
            Cancel
          </Button>
          <Button
            onPress={() => update({ displayName })}
            disabled={displayName === "" || displayName === user?.displayName}
            style={{
              width: "45%",
              height: 48,
            }}
            type="contained"
          >
            Edit
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Modal;
