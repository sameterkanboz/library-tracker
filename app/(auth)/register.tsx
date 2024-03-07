import { auth } from "@/config/firebaseConfig";
import Button from "@/core/button";
import { Textfield } from "@/core/textfield";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUp = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.navigate("(tabs)");
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F8f8f8",
        flex: 1,
        gap: 16,
      }}
    >
      <View
        style={{
          width: "80%",
          height: "30%",
          backgroundColor: "#F5DFCF",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          margin: 16,
        }}
      >
        <Text
          style={{
            position: "absolute",
            zIndex: 2,
            top: "20%",
            left: "10%",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Discover
        </Text>
        <Text
          style={{
            position: "absolute",
            zIndex: 2,
            top: "30%",
            left: "10%",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Books
        </Text>
        <Image
          source={require("@/assets/images/desk.png")}
          style={{ width: "65%", height: "65%", resizeMode: "contain" }}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          alignSelf: "flex-start",
          marginLeft: 32,
        }}
      >
        Register
      </Text>
      <View style={{ display: "flex", gap: 16 }}>
        <Textfield
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="email"
        />
        <Textfield
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="password"
          secureTextEntry
        />
      </View>
      <Button onPress={() => signUp(email, password)} type="contained">
        Register
      </Button>
      <Text>or</Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <Button
          style={{
            width: "43%",
            height: 48,
          }}
          type="outlined"
        >
          Google
        </Button>
        <Button disabled style={{ width: "43%", height: 48 }} type="outlined">
          Facebook
        </Button>
      </View>
      <Button
        style={{ height: 48 }}
        onPress={() => router.replace("/(auth)/login")}
        type="outlined"
      >
        Already have an account?
      </Button>
    </SafeAreaView>
  );
};

export default Register;
