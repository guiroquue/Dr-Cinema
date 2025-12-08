import { router } from "expo-router";

import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Fonts } from "@/src/constants/theme";

import { HomeButton } from "@/src/components/ui/home/home_buttons"
import { Footer } from "@/src/components/ui/footer"

import PopcornIcon from "@/src/assets/icons/popcorn_icon.svg";



export default function HomeView() {
  const theme = Colors.default;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <Text style={ styles.header }>
        <Text style={ styles.headerPart }>
          Nýjustu
        </Text>
        {" "}
        myndirnar beint til þín!
      </Text>
      <PopcornIcon
        width={264}
        height={264}
        style={{
          shadowColor: "#24282E",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.6,
          shadowRadius: 8,
          elevation: 8,
          marginBottom: -84,
          marginTop: -24,
         }}
      />
      <HomeButton
        title="Bíó"
        onPress={() => router.push("/screens/theaters")}
      />
      <HomeButton
        title="Væntanlegt í bíó"
        onPress={() => router.push("/screens/upcoming")}
      />

      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  header: {
    fontFamily: Fonts.heading.semibold,
    fontSize: 36,
    textAlign: "center",
    marginTop: 48,
  },

  headerPart: {
    color: Colors.default.action,
    fontFamily: Fonts.heading.black
  },
});
