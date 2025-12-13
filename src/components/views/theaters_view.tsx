import React, { useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { CinemaList } from "@/components/ui/theater_card";
import { fetchTheaters } from "@/store/theaters_slice";
import { Colors, Fonts } from "@/constants/theme";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";


type RootState = any;

type TheatersViewProps = {
  baseUrl?: string;
  token?: string;
};

export default function TheatersView({ baseUrl, token }: TheatersViewProps) {
  const dispatch = useDispatch<any>();
  const { items, loading, error } = useSelector((state: RootState) => state.theaters);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(fetchTheaters({ baseUrl, token }));
  }, [dispatch, baseUrl, token]);

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      paddingTop: -32,
      paddingBottom: 64,
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

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: Colors.default.background }]}>
      {loading ? (
        <>
          <ActivityIndicator />
          <Text style={styles.muted}>Loading cinemas…</Text>
        </>
      ) : error ? (
        <>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            style={styles.retryBtn}
            onPress={() => dispatch(fetchTheaters({ baseUrl, token }))}
          >
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </>
      ) : (
        <CinemaList theaters={items} />
      )}

      <LinearGradient
        colors={[Colors.default.background + "00", Colors.default.background]}
        style={{ position: "absolute", bottom: 24, left: 0, right: 0, height: insets.bottom + 120, zIndex: 10 }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[Colors.default.background, Colors.default.background + "00"]}
        style={{ position: "absolute", top: 12, left: 0, right: 0, height: insets.top - 26, zIndex: 10 }}
        pointerEvents="none"
      />
    </SafeAreaView>
  )};
