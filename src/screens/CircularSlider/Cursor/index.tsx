import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { canvas2Polar, clamp, polar2Canvas } from "react-native-redash";

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: Animated.SharedValue<number>;
  backgroundColor: Animated.SharedValue<string | number>;
}

const Cursor = ({ r, strokeWidth, theta, backgroundColor }: CursorProps) => {
  const center = { x: r, y: r };
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offset: { x: number; y: number };
    }
  >({
    onStart: (event, ctx) => {
      ctx.offset = polar2Canvas({ theta: theta.value, radius: r }, center);
    },
    onActive: (event, ctx) => {
      const { translationX, translationY } = event; // 드래그한 x,y좌표(부모 view 기준)
      const x = ctx.offset.x + translationX;
      const y1 = ctx.offset.y + translationY; //이동한 절대 y축 절대 거리
      const y =
        x < r //y축 기준 왼에 있을때
          ? y1
          : theta.value < Math.PI
          ? clamp(y1, 0, r - 0.001) //PI보다 작으면 x축 위
          : clamp(y1, r, 2 * r); //PI보다 크면 x축 밑

      const value = canvas2Polar({ x, y }, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value; // -각도면 +각도로 치환
    },
  });

  const style = useAnimatedStyle(() => {
    //각도와 중심점, 반지름으로 좌표를 구함
    const { x: translateX, y: translateY } = polar2Canvas(
      { theta: theta.value, radius: r },
      center
    );
    return {
      transform: [{ translateX }, { translateY }],
      backgroundColor: backgroundColor.value,
    };
  });
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
            backgroundColor: "#3884ff",
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};

export default Cursor;
