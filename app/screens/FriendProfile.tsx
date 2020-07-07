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
  let [following, setFollowing] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/112522383689004928445`
    );
    setUser(result.data.payload);
    const response = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setFollowing(response.data.payload.Following);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
    console.log(user.googleID);
    console.log(following);
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);

  const followUser = React.useCallback(async () => {
    console.log(`Following user ${user.googleID} now`);
    await fetchData();
  }, [refreshing]);

  const unfollowUser = React.useCallback(async () => {
    console.log(`Unfollowing user ${user.googleID} now`);
    await fetchData();
  }, [refreshing]);


  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {user && <ProfileInfo user={user} />}
        {
          user && following.includes(user.googleID) ? 
          <View>
            <Button
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={unfollowUser}
            >
              <Text>Unfollow</Text>
            </Button>
          </View>
          :
          <View>
            <Button
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={followUser}
            >
              <Text>Follow</Text>
            </Button>
          </View>
        }        
        {user && <Post user={user} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default FriendProfile;
