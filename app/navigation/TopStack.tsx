import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/LogIn";
import TabStack from "./TabStack";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import AddPost from "../screens/AddPost";
import FriendProfile from "../screens/FriendProfile";

const Stack = createStackNavigator();

const TopStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="MainStack" component={TabStack} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="FriendProfile" component={FriendProfile} />
    </Stack.Navigator>
  );
};

export default TopStack;
