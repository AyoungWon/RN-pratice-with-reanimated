import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { cards, Card, Cards } from "../components/Card";
import { useSpring, mix } from "react-native-redash";
import RoundButton from "../components/RoundButton";

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
const CardSpread = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const transition = useSpring(isOpen);
  return (
    <SafeAreaView style={styles.container}>
      {cards.map((cardItem, idx) => (
        <CardItem
          index={idx}
          transition={transition}
          cardItem={cardItem}
          key={cardItem}
        />
      ))}
      <View style={styles.button}>
        <RoundButton onPress={() => setIsOpen((prev) => !prev)} title="Click" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginBottom: 10,
    marginTop: "auto",
    padding: 40,
  },
});

export default CardSpread;
