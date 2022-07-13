import React, { HTMLAttributes } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="Todo list"
          onPress={() => navigation.navigate("TodoList")}
        />
        <Button
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
  },
});
export default Home;
