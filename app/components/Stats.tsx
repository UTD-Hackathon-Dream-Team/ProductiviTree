import React, { useState, useEffect, useContext } from "react";
import { Text } from "native-base";
import { ScrollView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const Stats = () => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setUser(result.data.payload);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);

  return (
    <ScrollView
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
    >
        <Text>X / Y Daily Goal Points</Text>
        <Text>Graph</Text>
        <Text>Z% of Daily Goal Achieved</Text>
        <Text>Tree Icon</Text>
        <Text>x Trees planted</Text>
        <Text>x Trees planted globally</Text>
        <Text>X / Y Points</Text>
        <Text>Graph</Text>
        <Text>Z Points until we plant a tree for your efforts</Text>
        <Text>Learn More About Tree Planting</Text>
    </ScrollView>
  );
};

export default Stats;
