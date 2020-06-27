import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from '../screens/Feed';
import Stats from '../screens/Stats';
import Challenges from '../screens/Challenges';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Challenges" component={Challenges} />
    </Tab.Navigator>
  );
};

export default TabStack;