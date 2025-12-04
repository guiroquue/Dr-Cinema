import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "@/src/constants/theme";

export default function Header() {
  const theme = Colors.default;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        <Text style={[styles.firstWord, { color: theme.action }]}>
          Nýjustu{" "}
        </Text>
        <Text>myndirnar{"\n"}beint til þín!</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },

  title: {
    fontFamily: Fonts.heading.semibold,
    fontSize: 36,
    lineHeight: 40,
    textAlign: "center",
  },

  firstWord: {
    fontFamily: Fonts.heading.bold,
  },
});
