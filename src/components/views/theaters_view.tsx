import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useAppDispatch, useAppSelector, fetchTheaters } from "@/store";

export default function HomeView() {
  const theme = Colors.default;

  const dispatch = useAppDispatch();
  const theaters = useAppSelector((s) => s.theaters.items);
  const loading = useAppSelector((s) => s.theaters.loading);
  const error = useAppSelector((s) => s.theaters.error);

  useEffect(() => {
    dispatch(fetchTheaters());
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {loading && <Text style={styles.text}>Loading theaters…</Text>}

      {!loading && error && <Text style={styles.text}>Error: {error}</Text>}

      {!loading && !error && (
        <View style={{ width: "100%" }}>
          <Text style={styles.text}>Theaters: {theaters.length}</Text>

          {theaters.map((t: any) => (
            <Text key={t.id ?? t._id ?? t.name} style={styles.text}>
              {t.name ?? "Unnamed theater"}
            </Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    marginTop: 12,
  },
});
