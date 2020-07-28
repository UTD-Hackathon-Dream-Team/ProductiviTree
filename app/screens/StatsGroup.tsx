import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Swiper from "react-native-swiper";
import Stats from "../components/Stats";
import GlobalBoard from "../components/GlobalBoard";
import FriendBoard from "../components/FriendBoard";

const StatsGroup = (props) => {
  return (
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={props.navigation} />
      <Swiper>
        <Stats />
        <GlobalBoard />
        <FriendBoard />
      </Swiper>
    </LinearGradient>
  );
};

export default StatsGroup;
