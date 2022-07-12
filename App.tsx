import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { runOnUI } from "react-native-reanimated";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

export default function App() {
  function someWorklet(greeting: string) {
    "worklet";
    console.log("Hey I'm running on the UI thread");
  }

  function onPress() {
    runOnUI(someWorklet)("Howdy");
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
