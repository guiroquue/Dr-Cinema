import { Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "@/src/constants/theme";

export function Footer() {

  return (
    <Text style={ styles.footer }>
        Dr.Cinema © All Rights Reserved
    </Text>
  );
}

const styles = StyleSheet.create({
  footer: {
    fontSize: 12,
    fontFamily: Fonts.heading.regular,
    color: Colors.default.secondary + "88", // better readability than "55"
    textAlign: "center",
  },
});
