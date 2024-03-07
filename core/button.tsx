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
const Button = (props: IButtonProps) => {
  const { type, children, onPress, disabled, style } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: type === "contained" ? "#252525" : "#f4f4f4",
          borderColor: "#252525",
          borderWidth: type === "outlined" ? 1.5 : 0,
          opacity: disabled ? 0.2 : 1,
          width: "90%",
          height: 60,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          borderRadius: 100,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        style,
      ]}
    >
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

export default Button;
