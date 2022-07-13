import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import Screens from "./src/screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Screens.Home} />
        <Stack.Screen name="TodoList" component={Screens.TodoList} />
        <Stack.Screen name="CardDrag" component={Screens.CardDrag} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
