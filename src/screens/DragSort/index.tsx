import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { cards, Card, CARD_WIDTH } from "../../components/Card";
import SortItem from "./SortItem";

const DragSort = () => {
  const { height, width } = useWindowDimensions();
  const currentDragItem = useSharedValue<number>(-1);
  const cardHeight = height / 3 - 20;
  const offsets = cards.map((_, idx) => useSharedValue(idx * cardHeight));

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: cardHeight * cards.length }}>
        {cards.map((card, idx) => (
          <SortItem
            key={`${card}_${idx}`}
            offsets={offsets}
            idx={idx}
            height={cardHeight}
            margin={(width - CARD_WIDTH) / 2}
            currentDragItem={currentDragItem}
          >
            <Card key={`${card}_${idx}`} card={card} option="row" />
          </SortItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DragSort;
