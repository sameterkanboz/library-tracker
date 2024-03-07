import Button from "@/core/button";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Welcome = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "transparent",
        flex: 1,
      }}
    >
      <Image
        source={require("@/assets/images/welcome.png")}
        style={{
          width: "80%",
          height: "50%",
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>
          Library Tracker
        </Text>
        <Text style={{ fontSize: 16, marginTop: 8 }}>
          Organize your reading journey effortlessly
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 64,
        }}
      >
        <Button
          onPress={() =>
            Linking.openURL("https://github.com/sameterkanboz/library-tracker")
          }
          type="outlined"
        >
          Get Started
        </Button>

        <Button
          type="contained"
          onPress={() => router.push("/(auth)/register")}
        >
          Create an account
        </Button>
      </View>
      <Pressable
        style={{
          position: "absolute",
          bottom: 60,
          alignSelf: "center",
          flexDirection: "row",
        }}
        onPress={() => Linking.openURL("https://twitter.com/sameterkanboz")}
      >
        <Text>contact with me </Text>
        <Text
          style={{
            fontStyle: "italic",
            textDecorationLine: "underline",
          }}
        >
          samet erkan boz
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Welcome;
