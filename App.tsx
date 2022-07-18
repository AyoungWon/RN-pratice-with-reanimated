import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
        <Stack.Screen name="CardSpread" component={Screens.CardSpread} />
        <Stack.Screen
          name="CircularSlider"
          component={Screens.CircularSlider}
        />
        <Stack.Screen
          name="DynamicSprings"
          component={Screens.DynamicSprings}
        />
        <Stack.Screen name="DragSort" component={Screens.DragSort} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
