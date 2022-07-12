import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  cancelAnimation,
  Easing,
  withRepeat,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

const startingPosition = 0;
export default function App() {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(pressed.value ? 1.2 : 1) },
        { translateX: x.value },
        { translateY: y.value },
      ],
    };
  });
  const tapRef = useRef();

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        {/* @ts-ignore */}
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.Image
            source={require("./assets/chunsik.gif")}
            style={[{ width: 200, height: 200 }, uas]}
          />
        </PanGestureHandler>
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
