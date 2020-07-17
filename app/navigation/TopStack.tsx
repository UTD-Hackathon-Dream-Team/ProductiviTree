import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/LogIn";
import TabStack from "./TabStack";

const Stack = createStackNavigator();

const TopStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="MainStack" component={TabStack} />
    </Stack.Navigator>
  );
};

export default TopStack;
