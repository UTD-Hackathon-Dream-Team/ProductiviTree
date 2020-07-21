import React from "react";
import { Icon } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Feed from "../screens/Feed";
import Challenges from "../screens/Challenges";
import StatsGroup from "../screens/StatsGroup";


const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon active={focused} name="ios-paper" />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsGroup}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon active={focused} name="md-stats" />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={Challenges}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon active={focused} name="logo-game-controller-b" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
