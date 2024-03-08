import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type TitleType = "Home" | "Search" | "Settings";

function Layout({ title }: { title: TitleType }) {
  const { user } = useAuth();
  const router = useNavigation();
  return (
    <View style={headerStyles.container}>
      {title === "Settings" && (
        <TouchableOpacity onPress={() => router.goBack()}>
          <Ionicons
            style={headerStyles.iconButton}
            name="chevron-back"
            size={24}
          />
        </TouchableOpacity>
      )}
      <Text style={headerStyles.title}>{title}</Text>
      {title === "Home" && (
        <TouchableOpacity onPress={() => console.log("pressed search")}>
          <Ionicons style={headerStyles.iconButton} name="search" size={24} />
        </TouchableOpacity>
      )}

      <View style={headerStyles.avatar}>
        <Text>{user?.email?.[0]}</Text>
      </View>
    </View>
  );
}

const Header = ({ title }: { title: TitleType }) => {
  switch (title) {
    case "Home":
      return <Layout title="Home" />;
    case "Search":
      return <Layout title="Search" />;
    case "Settings":
      return <Layout title="Settings" />;
    default:
      return null;
  }
};

export default Header;
const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  iconButton: {},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
});
