import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View, Button } from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import UserList from "../components/UserList";

const axios = require("axios").default;

const Follower = () => {
  const auth = useContext(AuthContext);
  let [following, setFollowing] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
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
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
      <Text style={{fontSize: 20, padding: 20}}>Your Followers:</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        { following.map(function (user, i) {
            return (
                <View key={ i }>
                    {user && <UserList user={ user }/>}
                </View>
            );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

export default Follower;