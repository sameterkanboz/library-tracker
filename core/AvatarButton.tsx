import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
type ButtonType = "contained" | "outlined" | "text";
interface IButtonProps {
  type: ButtonType;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  text?: ReactNode;
  subtext?: string;
  avatarLetter?: string;
}
const AvatarButton = (props: IButtonProps) => {
  const { type, text, onPress, disabled, style, subtext, avatarLetter } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: type === "contained" ? "#252525" : "#f4f4f4",
          borderColor: "rgba(37, 37, 37, .4)",
          borderBottomWidth: 0.3,
          opacity: disabled ? 0.2 : 1,
          width: "90%",
          height: 90,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
          padding: 16,
        },
        style,
      ]}
    >
      <Ionicons
        name="chevron-forward"
        size={24}
        color={type === "contained" ? "#f4f4f4" : "#252525"}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <View>
          <Text
            style={{
              color: type === "contained" ? "#f4f4f4" : "#252525",
              fontSize: 16,
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            {text}
          </Text>
          <Text>{subtext}</Text>
        </View>
        <View style={headerStyles.avatar}>
          <Text>{avatarLetter}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AvatarButton;
const headerStyles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
});
