import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  text: string;
  textColor: string;
  bgColor: string;
  onPress: () => void;
};

export default function Button({
  text,
  textColor,
  bgColor,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: bgColor }]}
    >
      <Text style={{ color: textColor }}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
  },
});
