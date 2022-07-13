import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Layout, SlideInRight } from "react-native-reanimated";

type Props = {
  task: string;
  idx: number;
};
const Task = ({ task, idx }: Props) => {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInRight.delay(idx * 100)}
      layout={Layout.springify()}
    >
      <Text>{task}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10%",
    backgroundColor: "#7ae8e1",
    width: "100%",
    marginBottom: 4,
    color: "#fff",
  },
});

export default Task;
