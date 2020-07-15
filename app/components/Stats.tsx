import React, { useState, useEffect, useContext } from "react";
import { Text } from "native-base";
import { ScrollView, RefreshControl, Image, View} from "react-native";
import { AuthContext } from "../AuthContext";
import tree from "../assets/tree_icon.png";

const axios = require("axios").default;

const Stats = () => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [trees, setTrees] = useState(0);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios( `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`);
    setUser(result.data.payload);
    const response = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users`);
    let allUsers = response.data.payload;
    let totalTress = 0;
    allUsers.forEach((otherUser: { Trees: Number }) => { totalTress += otherUser.Trees });
    setTrees(totalTress);
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
        contentContainerStyle={{alignItems: "center"}}
    >
        {user && 
            <View style={{alignItems: "center", paddingVertical: 20}}>
                <Text>X / Y Daily Goal Points</Text>
                <Text>Graph</Text>
                <Text>Z% of Daily Goal Achieved</Text>
            </View>
        }
        
        {user && 
            <View style={{alignItems: "center", paddingVertical: 20}}>
                <Image source={tree} style={{ height: 300, width: 300 }}/>
                <Text>{user.Trees} Trees planted</Text>
                <Text>{trees} Trees planted globally</Text>
            </View>
        }
        
        {user &&
            <View style={{alignItems: "center", paddingVertical: 20}}>
                <Text>{user.Points} / 1000 Points</Text>
                <Text>Graph</Text>
                <Text> {1000 - user.Points} Points until we plant a tree for your efforts</Text>
            </View>
        }

        <View style={{alignItems: "center", paddingVertical: 20}}>
            <Text>Learn More About Tree Planting</Text>
        </View>
    </ScrollView>
  );
};

export default Stats;
