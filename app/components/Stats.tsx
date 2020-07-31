import React, { useState, useEffect, useContext } from "react";
import { View, Button } from "native-base";
import { ScrollView, RefreshControl, Image, Linking, Text } from "react-native";
import { AuthContext } from "../AuthContext";
import * as Progress from "react-native-progress";
import tree from "../assets/tree_icon.png";

const axios = require("axios").default;

const Stats = () => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [trees, setTrees] = useState(0);
  let [points, setPoints] = useState(0);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setUser(result.data.payload);
    const response = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users`);
    let allUsers = response.data.payload;
    let totalTress = 0;
    allUsers.forEach((otherUser: { Trees: Number }) => {
      totalTress += otherUser.Trees;
    });
    setTrees(totalTress);
    const postResponse = await axios(`https://productivitree.wl.r.appspot.com/api/v1/posts/user/${auth.googleID}`);
    const allPosts = postResponse.data.payload;
    let totalPoints = 0;
    allPosts.forEach((post: { TimeStamp: Number , Activity: any }) => {
      let today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let currentDate = yyyy + '-' + mm + '-' + dd;

      let postDate = (post.TimeStamp).toString();
      // console.log("Today", currentDate);
      // console.log((postDate).substr(0, postDate.indexOf('T')));

      if( (postDate).substr(0, postDate.indexOf('T')) ===  (currentDate) )
        totalPoints += post.Activity.Points;
    });
    setPoints(totalPoints);
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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {user && (
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              {points} / {user.DailyGoal}{" "}
            </Text>
            Daily Goal Points
          </Text>
          <Progress.Bar progress={points / user.DailyGoal} width={250} />
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: "bold" }}> {(points / user.DailyGoal) * 100}% </Text>
            of Daily Goal Achieved
          </Text>
        </View>
      )}

      {user && (
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Image source={tree} style={{ height: 300, width: 300 }} />
          <Text style={{ fontSize: 30 }}>
            <Text style={{ fontWeight: "bold" }}> {user.Trees} </Text>
            trees planted by you
          </Text>
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: "bold" }}> {trees} </Text>
            trees planted globally
          </Text>
        </View>
      )}

      {user && (
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}> {user.Points} / 1000 Points</Text>
          <Progress.Bar progress={user.Points / 1000} width={200} />
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            <Text style={{ fontWeight: "bold" }}> {1000 - user.Points} </Text>
            Points until we plant a tree for your efforts
          </Text>
        </View>
      )}

      {/* <View style={{alignItems: "center", paddingVertical: 20}}>
            <Button onPress={ ()=>{ Linking.openURL('https://google.com')}}>
                <Text>Learn More About Tree Planting</Text>
            </Button>
        </View> */}
    </ScrollView>
  );
};

export default Stats;
