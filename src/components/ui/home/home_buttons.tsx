import { Pressable, Text, StyleSheet, Animated } from "react-native";
import { useRef } from "react";
import { Colors, Fonts } from "@/src/constants/theme";

interface HomeButtonProps {
  title: string;
  onPress: () => void;
}

export function HomeButton({ title, onPress }: HomeButtonProps) {
  const theme = Colors.default;

  // animation value
  const scale = useRef(new Animated.Value(1)).current;

  // shrink in
  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  // expand out
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ width: "100%" }} // keep layout control outside Animated.View
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: theme.secondary,
            transform: [{ scale }],
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: theme.primary,
              fontFamily: Fonts.heading.black,
            }
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,

    shadowColor: Colors.default.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 20,
  },
});
