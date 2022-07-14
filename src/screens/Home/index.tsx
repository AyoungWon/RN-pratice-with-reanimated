import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RoundButton from "../../components/RoundButton";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.container}>
        <RoundButton
          title="🧱 Todo list (Layout Animation)"
          onPress={() => navigation.navigate("TodoList")}
        />
        <RoundButton
          title="💳 Card drag (Pan Gesture)"
          onPress={() => navigation.navigate("CardDrag")}
        />
        <RoundButton
          title="🂱🃑🂡 Card spread (Transition)"
          onPress={() => navigation.navigate("CardSpread")}
        />
        <RoundButton
          title="⭕️ Circular slider"
          onPress={() => navigation.navigate("CircularSlider")}
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
