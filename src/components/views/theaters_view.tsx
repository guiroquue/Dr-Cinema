import React, { useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { CinemaList } from "@/components/ui/theater_card";
import { fetchTheaters } from "@/store/theaters_slice";
import { Colors, Fonts } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";


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
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading cinemas…</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable
          style={styles.retryBtn}
          onPress={() => dispatch(fetchTheaters({ baseUrl, token }))}
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return <CinemaList theaters={items} />;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingHorizontal: 20,
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
