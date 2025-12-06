import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UpcomingButton } from "@/src/components/ui/upcoming/upcoming_button"
import { Colors } from "@/src/constants/theme";
import { router } from "expo-router";

export default function TheaterView() {
  const theme = Colors.default;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <UpcomingButton
        title="View Upcoming Movies"
        onPress={() => router.push("/screens/upcoming")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 24,
  },
});
