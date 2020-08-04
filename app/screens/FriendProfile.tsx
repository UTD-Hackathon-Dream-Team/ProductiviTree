import React, { useState, useEffect, useContext } from "react";
import { Text, View, Button } from "native-base";
import { ScrollView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import { AuthContext } from "../AuthContext";
import ProfileInfo from "../components/ProfileInfo";
import Post from "../components/PostList";

const axios = require("axios").default;

const FriendProfile = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [following, setFollowing] = useState([]);
  let [followers, setFollowers] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${props.route.params.user}`
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
    await fetchData();
  }, [refreshing]);

  const followUser = React.useCallback(async () => {
    const newFollowing = following;
    await newFollowing.push(user.googleID);
    await axios.patch(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`,
      {
        Following: newFollowing,
      }
    );
    await axios
    .get( `https://productivitree.wl.r.appspot.com/api/v1/users/${user.googleID}`)
    .then(async function (response) {
      const newFollower = response.data.payload.Followers;
      await newFollower.push(auth.googleID);
      await axios.patch(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${user.googleID}`,
        {
          Followers: newFollower,
        }
      );
    })
    .catch(function (error) {
      console.log("Error", error.response);
    });
    console.log(`Following user ${user.googleID} now`);
    await fetchData();
  }, [refreshing]);

  const unfollowUser = React.useCallback(async () => {
    const newFollowing = following;
    var index = newFollowing.indexOf(user.googleID);
    if (index !== -1) newFollowing.splice(index, 1);
    await axios.patch(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`,
      {
        Following: newFollowing,
      }
    );
    await axios
    .get( `https://productivitree.wl.r.appspot.com/api/v1/users/${user.googleID}`)
    .then(async function (response) {
      const newFollower = response.data.payload.Followers;
      var index = newFollower.indexOf(auth.googleID);
      if (index !== -1) newFollower.splice(index, 1);
      await axios.patch(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${user.googleID}`,
        {
          Followers: newFollower,
        }
      );
    })
    .catch(function (error) {
      console.log("Error", error.response);
    });
    console.log(`Unfollowing user ${user.googleID} now`);
    await fetchData();
  }, [refreshing]);

  return (
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={props.navigation} backButton={true} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {user && <ProfileInfo user={user} navigate={props.navigation.push} />}
        {user && followers.includes(user.googleID) ? (
          <View>
            <Text>Follows You</Text>
          </View>
        ) : (
          <View></View>
        )}
        {user && following.includes(user.googleID) ? (
          <View>
            <Button
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={unfollowUser}
            >
              <Text>Unfollow</Text>
            </Button>
          </View>
        ) : (
          <View>
            <Button style={{ justifyContent: "center", alignItems: "center" }} onPress={followUser}>
              <Text>Follow</Text>
            </Button>
          </View>
        )}
        {user && <Post user={user.googleID} navigation={props.navigation}/>}
      </ScrollView>
    </LinearGradient>
  );
};

export default FriendProfile;
