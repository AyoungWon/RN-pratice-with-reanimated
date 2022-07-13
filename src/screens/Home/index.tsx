import React, { HTMLAttributes } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundButton from "../components/RoundButton";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.container}>
        <RoundButton
          title="Todo list"
          onPress={() => navigation.navigate("TodoList")}
        />
        <RoundButton
          title="Card drag"
          onPress={() => navigation.navigate("CardDrag")}
        />
      </View>
    </SafeAreaView>
  );
};
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
    padding: 10,
  },
});
export default Home;
