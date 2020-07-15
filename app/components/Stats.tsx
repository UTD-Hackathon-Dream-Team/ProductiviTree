import React, { useState, useEffect, useContext } from "react";
import { Text } from "native-base";
import { ScrollView, RefreshControl, Image, View} from "react-native";
import { AuthContext } from "../AuthContext";
import tree from "../assets/tree_icon.png";

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
        contentContainerStyle={{alignItems: "center", justifyContent: "space-around"}}
    >
        <View style={{alignItems: "center", justifyContent: "space-around"}}>
            <Text>X / Y Daily Goal Points</Text>
            <Text>Graph</Text>
            <Text>Z% of Daily Goal Achieved</Text>
        </View>
        
        <View style={{alignItems: "center", justifyContent: "space-around"}}>
            <Image source={tree} style={{ height: 300, width: 300 }}/>
            <Text>x Trees planted</Text>
            <Text>x Trees planted globally</Text>
        </View>
        
        <View style={{alignItems: "center", justifyContent: "space-around"}}>
            <Text>{user.Points} / 1000 Points</Text>
            <Text>Graph</Text>
            <Text>Z Points until we plant a tree for your efforts</Text>
            <Text>Learn More About Tree Planting</Text>
        </View>
    </ScrollView>
  );
};

export default Stats;
