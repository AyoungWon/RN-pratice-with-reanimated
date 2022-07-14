import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  theta: Animated.SharedValue<number>;
  r: number;
  strokeWidth: number;
  backgroundColor: Animated.SharedValue<string | number>;
}
const { PI } = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export const Progress = ({
  theta,
  r,
  strokeWidth,
  backgroundColor,
}: CircularProgressProps) => {
  const radius = r - strokeWidth / 2; //작은 원
  const circumference = radius * 2 * PI;
  const props = useAnimatedProps(() => {
    return {
      stroke: backgroundColor.value,
      strokeDashoffset: theta.value * radius, // progress 시작점(cursor의 위치) 변경
    };
  });
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle /* 배경 원 그리기 */
        cx={r}
        cy={r}
        fill="transparent"
        stroke="white"
        r={radius}
        {...{ strokeWidth }}
      />
      <AnimatedCircle /* progress 원 */
        animatedProps={props}
        cx={r}
        cy={r}
        fill="transparent"
        r={radius}
        stroke={"#3884ff"}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ strokeWidth }}
      />
    </Svg>
  );
};
export default Progress;
