import React from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDecay,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";
import { Cards, Card, CARD_WIDTH, CARD_HEIGHT } from "../../../components/Card";

type AnimatedGHContext = {
  offsetX: number;
  offsetY: number;
};

type Props = {
  cardStyle: object;
  topCardX: SharedValue<number>;
  topCardY: SharedValue<number>;
  width: number;
  height: number;
};
const TopCard = ({ cardStyle, topCardX, topCardY, width, height }: Props) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT - 42;

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event, ctx: AnimatedGHContext) => {
        ctx.offsetX = topCardX.value;
        ctx.offsetY = topCardY.value;
      },
      onActive: (event, ctx: AnimatedGHContext) => {
        topCardX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
        topCardY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
      },
      onEnd: (event) => {
        topCardX.value = withDecay({
          velocity: event.velocityX,
          clamp: [0, boundX],
        });

        topCardY.value = withDecay({
          velocity: event.velocityY,
          clamp: [0, boundY],
        });
      },
    });

  const topCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: topCardX.value },
        { translateY: topCardY.value },
      ],
    };
  });
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View style={[cardStyle, topCardStyle]}>
        <Card card={Cards.Card3} option="row" />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TopCard;
