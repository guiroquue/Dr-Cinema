import { Pressable, StyleSheet, Animated, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useEffect } from "react";
import { Colors, Fonts } from "@/constants/theme";

interface Props {
  onPress: () => void;
  visible: boolean;
}

export function ScrollToTopButton({ onPress, visible }: Props) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  });

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 40,
      bounciness: 0,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fade,
          transform: [{ scale }],
          pointerEvents: visible ? "auto" : "none",
        },
      ]}
    >
      <Pressable
        style={styles.button}
        onPress={onPress}
        onPressIn={animateIn}
        onPressOut={animateOut}
      >
        <Text style={styles.label}>Fara efst á síðu</Text>
        <Ionicons
          name="chevron-up-outline"
          size={20}
          color={Colors.default.background}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 124,
    right: 20,
    zIndex: 50,
  },

  button: {
    backgroundColor: Colors.default.secondary,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: Colors.default.secondary,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  label: {
    color: Colors.default.primary,
    fontFamily: Fonts.body.semibold,
    fontSize: 12,
  },
});
