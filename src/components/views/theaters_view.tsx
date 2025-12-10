// components/theaters_view.tsx
import React, { useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { CinemaList } from "@/components/ui/theater_card"; // <- adjust if your path differs
import { fetchTheaters } from "@/store/theaters_slice"; // <- adjust to your slice path
import { Colors, Fonts } from "@/constants/theme";

// If you have typed hooks/types, swap these for useAppDispatch/useAppSelector + RootState.
type RootState = any;

type TheatersViewProps = {
  baseUrl?: string;
  token?: string;
};

export default function TheatersView({ baseUrl, token }: TheatersViewProps) {
  const dispatch = useDispatch<any>();
  const { items, loading, error } = useSelector((state: RootState) => state.theaters);

  useEffect(() => {
    dispatch(fetchTheaters({ baseUrl, token }));
  }, [dispatch, baseUrl, token]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading cinemas…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable
          style={styles.retryBtn}
          onPress={() => dispatch(fetchTheaters({ baseUrl, token }))}
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return <CinemaList theaters={items} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 10,
  },
  muted: {
    color: Colors.default.secondary,
    fontFamily: Fonts.body.medium,
  },
  errorText: {
    color: "tomato",
    fontFamily: Fonts.body.semibold,
    textAlign: "center",
  },
  retryBtn: {
    backgroundColor: Colors.default.action,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: Colors.default.primary,
    fontFamily: Fonts.body.semibold,
  },
});
