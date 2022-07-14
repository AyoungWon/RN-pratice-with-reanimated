import React from "react";
import { Button, StyleSheet, View } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

const RoundButton = ({ title, onPress }: Props) => {
  return (
    <View style={styles.button}>
      <Button title={title} onPress={onPress} color="#343434" />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 2,
    width: "100%",
    marginBottom: 4,
  },
});

export default RoundButton;
