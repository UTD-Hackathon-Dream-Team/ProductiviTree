import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, Icon, Button } from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import Post from "../components/PostList";

const axios = require("axios").default;

const Profile = (props: any) => {
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

  function goToSettings() {
    props.navigation.navigate("Settings");
  }
  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={props.navigation} backButton={true} settings={true} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {user && <ProfileInfo user={user} navigate={props.navigation.navigate} />}
        <Button style={{ justifyContent: "center", alignItems: "center" }} onPress={goToSettings}>
          <Text>Settings</Text>
        </Button>
        {user && <Post user={user.googleID} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
