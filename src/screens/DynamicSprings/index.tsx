import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Cards } from "../../components/Card";
import TopCard from "./TopCard";

const DynamicSprings = () => {
  const { width, height } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const dynamicTranslateX1 = useDerivedValue(() =>
    withSpring(translateX.value)
  );
  const dynamicTranslateY1 = useDerivedValue(() =>
    withSpring(translateY.value)
  );
  const dynamicTranslateX2 = useDerivedValue(() =>
    withSpring(dynamicTranslateX1.value)
  );
  const dynamicTranslateY2 = useDerivedValue(() =>
    withSpring(dynamicTranslateY1.value)
  );
  const followCard1Style1 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: dynamicTranslateX1.value },
        { translateY: dynamicTranslateY1.value },
      ],
    };
  });

  const followCard1Style2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: dynamicTranslateX2.value },
        { translateY: dynamicTranslateY2.value },
      ],
    };
  });

  return (
    <SafeAreaView>
      <View style={{ ...styles.outer, height }}>
        <Animated.View style={[styles.card, followCard1Style2]}>
          <Card card={Cards.Card1} option="row" />
        </Animated.View>
        <Animated.View style={[styles.card, followCard1Style1]}>
          <Card card={Cards.Card2} option="row" />
        </Animated.View>
        <TopCard
          cardStyle={styles.card}
          topCardX={translateX}
          topCardY={translateY}
          width={width}
          height={height}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  card: { ...StyleSheet.absoluteFillObject },
});
export default DynamicSprings;
