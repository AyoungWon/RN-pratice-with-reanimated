import React from "react";
import { StyleSheet, View } from "react-native";
import TodoList from "./src/TodoList";

export default function App() {
  return (
    <View style={styles.outer}>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },

  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
