import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/src/constants/theme";
import Header from "@/src/components/ui/header";

export default function CinemasView() {
  const theme = Colors.default;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]} >
        <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  }
});
