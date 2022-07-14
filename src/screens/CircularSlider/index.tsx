import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { canvas2Polar } from "react-native-redash";
import Cursor from "./Cursor";
import Progress from "./Progress";
const { width } = Dimensions.get("window");

const size = width - 32; //지름
const STROKE_WIDTH = 40;
const r = PixelRatio.roundToNearestPixel(size / 2); //반지름
const defaultTheta = canvas2Polar({ x: -100, y: -100 }, { x: r, y: r }).theta;

const CircularSlider = () => {
  const theta = useSharedValue(defaultTheta);
  const backgroundColor = useDerivedValue(() => {
    //컬러 그라데이션
    return interpolateColor(
      theta.value,
      [0, Math.PI, Math.PI * 2],
      ["#ff3884", "#3884ff", "#38ffb3"]
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Progress
            strokeWidth={STROKE_WIDTH}
            {...{ r }}
            {...{ theta }}
            backgroundColor={backgroundColor}
          />
        </Animated.View>
        <Cursor
          strokeWidth={STROKE_WIDTH}
          r={r - STROKE_WIDTH / 2}
          backgroundColor={backgroundColor}
          {...{ theta }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: r * 2,
    height: r * 2,
  },
});
export default CircularSlider;
