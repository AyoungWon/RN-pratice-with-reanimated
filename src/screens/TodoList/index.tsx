import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Task from "./Task";
import { SafeAreaView } from "react-native-safe-area-context";
const TodoList = () => {
  const [tasks, setTasks] = useState<string[]>(["Learn"]);
  const insertTaskAtRandom = () => {
    setTasks((items) => {
      const random = Math.floor(Math.random() * (items.length - 1));
      let newArr = [...items];
      newArr.splice(random, 0, `new item ${newArr.length}`);
      return newArr;
    });
  };
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.listWrap}>
          {tasks.map((item, idx) => (
            <Task key={item} task={item} idx={idx} />
          ))}
        </View>
        <Button title="ADD" onPress={insertTaskAtRandom} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: { flex: 1 },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10%",
    width: "100%",
  },
  listWrap: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ddd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid red",
  },
});

export default TodoList;
