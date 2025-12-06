import { Pressable, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "@/src/constants/theme";

interface UpcomingButtonProps {
  title: string;
  onPress: () => void;
}

export function UpcomingButton({ title, onPress }: UpcomingButtonProps) {
  const theme = Colors.default;

  return (
    <Pressable style={[styles.button, { backgroundColor: theme.text }]} onPress={onPress}>
      <Text style={[styles.text, { color: theme.background, fontFamily: Fonts.heading.bold }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "600"
  }
});
