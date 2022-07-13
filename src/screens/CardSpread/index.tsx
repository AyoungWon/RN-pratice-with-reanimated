import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { cards, Card, Cards } from "../components/Card";
import { useSpring, mix } from "react-native-redash";

type Props = {
  transition: Animated.SharedValue<number>;
  index: number;
  cardItem: Cards;
};

const CardItem = ({ index, cardItem, transition }: Props) => {
  const { width } = Dimensions.get("window");
  const origin = -(width / 2 - 8 * 2);
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      padding: 8 * 4,
    },
  });
  const style = useAnimatedStyle(() => {
    const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);
    return {
      transform: [
        { translateX: origin },
        { rotate: `${rotate}rad` },
        { translateX: -origin },
      ],
    };
  });

  return (
    <Animated.View key={cardItem} style={[styles.overlay, style]}>
      <Card card={cardItem} option="row" />
    </Animated.View>
  );
};
export const CardSpread = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const transition = useSpring(isOpen);
  return (
    <SafeAreaView>
      {cards.map((cardItem, idx) => (
        <CardItem index={idx} transition={transition} cardItem={cardItem} />
      ))}
    </SafeAreaView>
  );
};
