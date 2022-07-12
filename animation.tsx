import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  cancelAnimation,
  Easing,
  withRepeat,
} from "react-native-reanimated";

export default function App() {
  const sharedVal = useSharedValue(1);

  function onPress() {
    sharedVal.value = Math.random() * 0.4 + 0.3;
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(
            withSpring(sharedVal.value, {
              damping: 20,
              stiffness: 80,
            }),
            6,
            true
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Animated.Image
          source={require("./assets/chunsik.gif")}
          style={[animatedStyles, { width: 200, height: 200 }]}
        />
        <Text>hello world!</Text>
        <Button onPress={onPress} title={"Touch me"} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
