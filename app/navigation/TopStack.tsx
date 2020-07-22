import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogIn from "../screens/LogIn";
import TabStack from "./TabStack";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import AddPost from "../screens/AddPost";
import FriendProfile from "../screens/FriendProfile";
import Follower from "../screens/Follower";
import Following from "../screens/Following";
import Search from "../screens/Search";
import ChooseActivity from "../screens/ChooseActivity";

const Stack = createStackNavigator();

const TopStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="MainStack" component={TabStack} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChooseActivity" component={ChooseActivity} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="FriendProfile" component={FriendProfile} />
      <Stack.Screen name="Follower" component={Follower} />
      <Stack.Screen name="Following" component={Following} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default TopStack;
