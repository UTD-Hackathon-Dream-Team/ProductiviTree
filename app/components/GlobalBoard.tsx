import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "native-base";
import { ScrollView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import BoardList from "../components/BoardList";
import { useNavigation } from "@react-navigation/native";

const axios = require("axios").default;

const GlobalBoard = (props) => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  let [users, setUsers] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/`
    );
    setUsers(result.data.payload);
    // const allUsers = result.data.payload;
    // var index = (result.data.payload).indexOf(auth.googleID);
    // if (index !== -1) allUsers.splice(index, 1);
    // console.log(allUsers.length);
    // setUsers(allUsers);
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
      <Text style={{ fontSize: 20, padding: 20 }}>Global Leaderboard:</Text>
      <View style={{ padding: 20 }}>
        <BoardList user={auth.googleID} navigation={navigation}/>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {users.map(function (user, i) {
            return (
                <View key={i}>
                    <BoardList position={i+1} user={user.googleID} navigation={navigation} />
                </View>
                // <View key={i}>
                //     {user.googleID == auth.googleID.toString() ? (
                //         <></>
                //     ) : (
                //         <BoardList position={i+1} user={user.googleID} navigation={navigation} />
                //     )}
                // </View>
            );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

export default GlobalBoard;
