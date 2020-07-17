import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/LogIn";
import TabStack from "./TabStack";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

const TopStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="MainStack" component={TabStack} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default TopStack;
