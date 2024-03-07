import { auth } from "@/config/firebaseConfig";
import Button from "@/core/button";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const logout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/"); // Replace "(auth)" with the appropriate route value
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} />
      <Button
        type="outlined"
        onPress={() => router.navigate("/(tabs)/(profile)/settings")}
      >
        Settings
      </Button>
      <Button onPress={logout} type="contained">
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
