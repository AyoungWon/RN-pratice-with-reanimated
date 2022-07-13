import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type AnimatedGHContext = {
  offsetX: number;
  offsetY: number;
};

const CARD_IMAGE_URL = "../../../assets/card_chunsik.png";
const CardDrag = () => {
  const { width, height } = useWindowDimensions();
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { boundX, boundY } = useMemo(
    () => ({
      boundX: width - imageSize.width,
      boundY: height - imageSize.height - 50,
    }),
    [width, imageSize]
  );

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const clamp = (value: number, lowerBound: number, upperBound: number) => {
    "worklet";
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx: AnimatedGHContext) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: (event) => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, boundX],
      });

      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, boundY],
      });
    },
  });

  useEffect(() => {
    const { width, height } = Image.resolveAssetSource(require(CARD_IMAGE_URL));
    setImageSize({ width, height });
  }, []);

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <SafeAreaView style={{ ...styles.outer, height }}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={cardStyle}>
          <Image source={require(CARD_IMAGE_URL)} />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default CardDrag;
