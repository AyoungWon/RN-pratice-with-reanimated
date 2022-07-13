import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
  },
});

export const columnAssets = [
  require("@assets/card_chunsik_column_0.png"),
  require("@assets/card_chunsik_column_1.png"),
  require("@assets/card_chunsik_column_2.png"),
];

export const rowAssets = [
  require("@assets/card_chunsik_row_0.png"),
  require("@assets/card_chunsik_row_1.png"),
];

export enum Cards {
  Card1 = 0,
  Card2 = 1,
  Card3 = 2,
}

export const cards = [Cards.Card1, Cards.Card2, Cards.Card3];

interface CardProps {
  card: Cards;
  option: "row" | "column";
}

export const Card = ({ card, option }: CardProps) => {
  return (
    <Image
      style={styles.card}
      source={option === "row" ? rowAssets[card] : columnAssets[card]}
    />
  );
};

export default {
  Card,
  cards,
};
