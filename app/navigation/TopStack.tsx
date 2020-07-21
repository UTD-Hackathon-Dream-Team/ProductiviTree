import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/LogIn";
import TabStack from './TabStack';
import Profile from "../screens/Profile";
import  Settings  from "../screens/Settings";

const Stack = createStackNavigator();

const TopStack = () => { // depending on log in have diff. stacks
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="MainStack" component={TabStack} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default TopStack;
