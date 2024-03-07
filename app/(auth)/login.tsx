import { auth } from "@/config/firebaseConfig";
import Button from "@/core/button";
import { Textfield } from "@/core/textfield";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/");
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
          backgroundColor: "#FCFDF5",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          margin: 16,
        }}
      >
        <LinearGradient
          colors={["rgba(140, 192, 128, 1)", "rgba(136, 217, 220, 1)"]}
          end={{ x: 1, y: 0 }}
          style={styles.background}
        />
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
          Keep
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
          Exploring
        </Text>
        <Image
          source={require("@/assets/images/signin.jpg")}
          style={{ width: "65%", height: "65%", resizeMode: "cover" }}
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
        Login
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
      <Button onPress={() => signIn(email, password)} type="contained">
        Login
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
        onPress={() => router.replace("/(auth)/register")}
        type="outlined"
      >
        Don't have an account?
      </Button>
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 16,
  },
});
