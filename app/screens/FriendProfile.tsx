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
  let [self, setSelf] = useState(null);
  let [following, setFollowing] = useState([]);
  let [followers, setFollowers] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${props.user}`
    );
    setUser(result.data.payload);
    const response = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setFollowing(response.data.payload.Following);
    setFollowers(response.data.payload.Followers);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    const newFollowing = following;
    var index = newFollowing.indexOf(user.googleID);
    if (index !== -1) newFollowing.splice(index, 1);
    await axios.patch(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`,
      {
        Following: newFollowing,
      }
    );
    await fetchData();
  }, [refreshing]);

  const followUser = React.useCallback(async () => {
    const newFollowing = following;
    await newFollowing.push(user.googleID);
    await axios.patch(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`,
      {
        Following: newFollowing,
      }
    );
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
          user && followers.includes(user.googleID) ? 
          <View>
              <Text>Follows You</Text>
          </View>
          :
          <View>
          </View>
        }
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
        {user && <Post user={user.googleID} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default FriendProfile;
