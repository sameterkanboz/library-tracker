import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
type ButtonType = "contained" | "outlined" | "text";
interface IButtonProps {
  type: ButtonType;
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
const ArrowButton = (props: IButtonProps) => {
  const { type, children, onPress, disabled, style } = props;
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
          height: 60,
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
      <Text
        style={{
          color: type === "contained" ? "#f4f4f4" : "#252525",
          fontSize: 16,
          fontWeight: "bold",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ArrowButton;
