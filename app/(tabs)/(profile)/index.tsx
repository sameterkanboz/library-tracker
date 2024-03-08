import { auth } from "@/config/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import Button from "@/core/button";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    // Burada kullanıcı tercihlerinizi güncelleyebilirsiniz.
    // Örneğin, kullanıcının tercihlerini bir veritabanında saklayabilirsiniz.
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/"); // "(auth)" değerini uygun rota değeriyle değiştirin
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{user?.email?.[0]}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => router.navigate("/(profile)/modal")}
            style={{ position: "absolute", right: -24, top: -8 }}
          >
            <FontAwesome5 name="edit" size={20} color="#252525" />
          </TouchableOpacity>

          <Text style={styles.displayName}>
            {user?.displayName ? user.displayName : "Edit Name"}
          </Text>
        </View>

        <Text style={styles.email}>{user?.email}</Text>
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 32,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Book Updates
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            height: 60,
            backgroundColor: "#f4f4f4",
            borderRadius: 100,
            padding: 16,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: isEnabled ? "#252525" : "rgba(0, 0, 0, 0.5)",
              fontWeight: "bold",
            }}
          >
            Turn {!isEnabled ? "On" : "Off"} Notifications
          </Text>
          <Switch
            trackColor={{ false: "#f8f8f8", true: "#252525" }}
            thumbColor={isEnabled ? "#f8f8f8" : "#252525"}
            ios_backgroundColor="#f8f8f8"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{
              transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
              borderWidth: 1,
              borderColor: "#252525",
            }}
          />
        </View>
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 32,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Share Profile
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            height: 60,
            backgroundColor: "#f4f4f4",
            borderRadius: 100,
            padding: 16,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.26,
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#252525",
              fontWeight: "bold",
            }}
          >
            Find Friends
          </Text>
          <Button type="outlined" style={{ width: "40%", height: 40 }}>
            Share
          </Button>
        </View>

        <Button
          type="outlined"
          onPress={() => router.navigate("/(tabs)/(profile)/settings")}
          style={{
            marginTop: 32,
          }}
        >
          Settings
        </Button>

        <Button onPress={logout} type="contained">
          Log out
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
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
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: {
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "normal",
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});
