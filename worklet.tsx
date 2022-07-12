import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { runOnJS, runOnUI } from "react-native-reanimated";

const width = 135.5;

export default function App() {
  // function someWorklet(greeting: string) {
  //   "worklet";
  //   console.log("Hey I'm running on the UI thread");
  // }

  // function otherWorklet() {
  //   "worklet";
  //   console.log("Captured width is", width);
  // }

  // function returningWorklet() {
  //   "worklet";
  //   return "I'm back";
  // }

  // function someWorklet() {
  //   "worklet";
  //   let what = returningWorklet();
  //   console.log("On the UI thread, other worklet says", what);
  // }

  function callback(text: string) {
    console.log("Running on the RN thread", text);
  }

  function someWorklet() {
    "worklet";
    console.log("I'm on UI but can call methods from the RN thread");
    runOnJS(callback)("can pass arguments too");
  }

  function onPress() {
    // runOnUI(someWorklet)("Howdy");
    // runOnUI(otherWorklet)();
    runOnUI(someWorklet)();
  }

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Image
          source={require("./assets/chunsik.gif")}
          style={{ width: 200, height: 200 }}
        />
        <Text>hello world!</Text>
        <Button onPress={onPress} title={"Touch me"} />
        <StatusBar style="auto" />
      </View>
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
