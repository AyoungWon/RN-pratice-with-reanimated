import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  children: ReactElement;
  offsets: Animated.SharedValue<number>[];
  idx: number;
  height: number;
  margin: number;
  currentDragItem: Animated.SharedValue<number>;
};

type ContextType = {
  offsetX: number;
  offsetY: number;
};
const SortItem = ({
  children,
  offsets,
  idx,
  height,
  margin,
  currentDragItem,
}: Props) => {
  const dragActive = useSharedValue(false);
  const offset = offsets[idx];
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const translateY = useDerivedValue(
    () => (dragActive.value ? y.value : withSpring(offset.value)) //드래그 되고있는 아이템이면 y값 아니면 변경된 offsets의 값
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, ctx) => {
      currentDragItem.value = idx;
      ctx.offsetY = offset.value;
      y.value = offset.value;
      dragActive.value = true;
    },
    onActive: (event, ctx) => {
      x.value = event.translationX;
      y.value = ctx.offsetY + event.translationY;
      const offsetY = Math.round(y.value / height) * height; //움직이는 아이템이 가야할 위치의 아이템의 offsetY
      offsets.forEach((originOffset, index) => {
        if (originOffset.value === offsetY && index !== idx) {
          //바꿔야할 아이템이면
          originOffset.value = offset.value; // 바꿔야할 아이템의 위치를 움직이는 아이템의 원래 위치로
          offset.value = offsetY; // 움직이는 아이템의 위치는 바꿔야할 아이템의 위치
        }
      });
    },
    onEnd: (event, ctx) => {
      dragActive.value = false;
      x.value = withSpring(0);
      y.value = withSpring(offset.value);
    },
  });

  const style = useAnimatedStyle(() => ({
    zIndex: dragActive.value && currentDragItem.value === idx ? 100 : 0,

    transform: [
      { translateX: x.value },
      { translateY: translateY.value },
      { scale: withSpring(dragActive.value ? 1.1 : 1) },
    ],
  }));
  return (
    <PanGestureHandler {...{ onGestureEvent }}>
      <Animated.View style={[styles.container, style, { marginLeft: margin }]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 0,
  },
});
export default SortItem;
