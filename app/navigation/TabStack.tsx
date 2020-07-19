import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import FriendProfile from '../screens/FriendProfile';
import StatsGroup from '../screens/StatsGroup';
import Challenges from '../screens/Challenges';
import AddPost from '../screens/AddPost';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Stats" component={Profile} />
      <Tab.Screen name="Challenges" component={Challenges} />
    </Tab.Navigator>
  );
};

export default TabStack;