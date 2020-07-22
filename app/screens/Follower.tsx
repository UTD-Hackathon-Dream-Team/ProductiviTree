import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "native-base";
import { ScrollView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import UserList from "../components/UserList";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const axios = require("axios").default;

const Follower = (props) => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  let [following, setFollowing] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    console.log(props.user);
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${props.route.params.user}`
    );
    setFollowing(result.data.payload.Followers);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);

  return (
    <LinearGradient
      colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
      style={{ flex: 1 }}
    >
      <Header navigation={navigation} backButton={true} />
      <Text style={{ fontSize: 20, padding: 20 }}>Followers:</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {following.map(function (user, i) {
          return <View key={i}>{user && <UserList user={user} navigation={navigation}/>}</View>;
        })}
      </ScrollView>
    </LinearGradient>
  );
};

export default Follower;
