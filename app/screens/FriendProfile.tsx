import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View, Button } from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import ProfileInfo from "../components/ProfileInfo";
import Post from "../components/PostList";

const axios = require("axios").default;

const FriendProfile = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${props.user}`
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

  function followUser() {
    console.log(`Un/Following user ${user.googleID} now`);
  }

  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {user && <ProfileInfo user={user} />}        
        <Button
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={followUser}
        >
          <Text>Un/follow</Text>
        </Button>
        {user && <Post user={user} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default FriendProfile;
