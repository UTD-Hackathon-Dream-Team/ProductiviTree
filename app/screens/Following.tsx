import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View, Button } from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import UserList from "../components/UserList";

const axios = require("axios").default;

const Following = () => {
  const auth = useContext(AuthContext);
  let [following, setFollowing] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setFollowing(result.data.payload.Following);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);

  function goToSearch() {
    console.log("Search Page Here");
  }

  return (
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
        <Text style={{fontSize: 20, padding: 20}}>Your Following:</Text>
        <ScrollView
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            { following.map(function (user, i) {
                return (
                    <View>
                        {/* TODO: Just need to fix this conditional */}
                        { ( (user.googleID) == ((auth.googleID).toString()) ) ? 
                            <View></View> : 
                            <View key={ i }>
                                {user && <UserList user={ user }/>}
                            </View>
                        }
                    </View>
                    
                );
            })}

        </ScrollView>
        <View style={{ padding: 30}}>
            <Button style={{ justifyContent: "center", alignItems: "center" }} onPress={goToSearch} >
                <Text>Follow More Users</Text>
            </Button>    
        </View>
    </LinearGradient>
  );
};

export default Following;
