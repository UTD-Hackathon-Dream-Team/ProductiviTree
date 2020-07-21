import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Swiper from "react-native-swiper";
import Stats from "../components/Stats";

const StatsGroup = (props) => {
  return (
    <LinearGradient
      colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
      style={{ flex: 1 }}
    >
      <Header navigation={props.navigation} />
      <Swiper>
        <Stats />
        {/* <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text>Global Leaderboard</Text>
        </ScrollView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text>Friend Leaderboard</Text>
        </ScrollView> */}
      </Swiper>
    </LinearGradient>
  );
};

export default StatsGroup;