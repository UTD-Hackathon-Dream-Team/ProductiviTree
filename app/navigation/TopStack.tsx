import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/LogIn";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

const TopStack = () => { // depending on log in have diff. stacks
  return (
    <Stack.Navigator>
    <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default TopStack;
