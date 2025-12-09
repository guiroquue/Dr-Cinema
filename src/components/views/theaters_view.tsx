import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";


export default function TheatersView() {
  const theme = Colors.default;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
