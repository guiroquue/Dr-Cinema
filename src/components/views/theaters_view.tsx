import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/src/constants/theme";

export default function HomeView() {
  const theme = Colors.default;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
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
