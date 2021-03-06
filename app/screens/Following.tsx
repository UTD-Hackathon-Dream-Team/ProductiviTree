import React, { useState, useEffect, useContext } from "react";
import { Text, View, Button } from "native-base";
import { ScrollView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import { useNavigation } from "@react-navigation/native";
import UserList from "../components/UserList";
import Header from "../components/Header";

const axios = require("axios").default;

const Following = (props) => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  let [following, setFollowing] = useState([]);
  let [user, setUser] = useState({});
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${props.route.params.user}`
    );
    setFollowing(result.data.payload.Following);
    setUser(result.data.payload);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);

  function goToSearch() {
    navigation.push("Search");
  }

  return (
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={navigation} backButton={true} />
      <Text style={{ fontSize: 20, padding: 20 }}> {user.Username}'s  Following:</Text>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {following.map(function (followingUser, i) {
          return (
            <View key={i}>
              {followingUser == (props.route.params.user) ? (
                <></>
              ) : (
                <UserList user={followingUser} navigation={navigation} />
              )}
            </View>
          );
        })}
      </ScrollView>

      {props.route.params.user == auth.googleID.toString() ? (
        <View style={{ padding: 30 }}>
          <Button style={{ justifyContent: "center", alignItems: "center" }} onPress={goToSearch}>
            <Text>Follow More Users</Text>
          </Button>
        </View>
      ) : (
        <></>
      )}
    </LinearGradient>
  );
};

export default Following;
