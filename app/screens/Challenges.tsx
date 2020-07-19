import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, Header } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import Challenge from "../components/ChallengeList";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";

const axios = require("axios").default;

var styles = {
  listBox: {
    backgroundColor: "#fff",
    margin: 20,
    height: 250,
  },
  header: {

    textAlign: "center",
    fontSize: 32,
    padding: 20,
  }
};

const Challenges = () => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [dailyChallenges, setDailyChallenges] = useState([]);
  let [weeklyChallenges, setWeeklyChallenges] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    //console.log(result.data.payload.dailyChallenges[0]._id);
    var dayChallenges = new Array();
    var weekChallenges = new Array();
    for(var i = 0; i < result.data.payload.dailyChallenges.length; i++){
      const dailyChallenge = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/challenges/${result.data.payload.dailyChallenges[i]._id}`
      );
      //console.log(challenge.data.payload);
      dayChallenges[i] = {
        _id: dailyChallenge.data.payload._id,
        description: dailyChallenge.data.payload.description,
        goal: dailyChallenge.data.payload.goal,
        points: dailyChallenge.data.payload.points,
        progress: result.data.payload.dailyChallenges[i].progress
      };
    }
    for(var i = 0; i < result.data.payload.weeklyChallenges.length; i++){
      const weeklyChallenge = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/challenges/${result.data.payload.weeklyChallenges[i]._id}`
      );
      //console.log(challenge.data.payload);
      weekChallenges[i] = {
        _id: weeklyChallenge.data.payload._id,
        description: weeklyChallenge.data.payload.description,
        goal: weeklyChallenge.data.payload.goal,
        points: weeklyChallenge.data.payload.points,
        progress: result.data.payload.weeklyChallenges[i].progress
      };
    }
    /* console.log(dayChallenges);
    console.log(weekChallenges); */
    setUser(result.data.payload);
    setDailyChallenges(dayChallenges);
    setWeeklyChallenges(weekChallenges);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
    /* console.log(dailyChallenges);
    console.log(weeklyChallenges);  */
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);
  
  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Content>
        <Text style={styles.header}>Challenges</Text>
        <Text style={styles.header}>Weekly</Text>
        <Container style={styles.listBox}>
        {user && <Challenge challenges={weeklyChallenges} />}
        </Container>
        <Text style={styles.header}>Daily</Text>
        <Container style={styles.listBox}>
        {user && <Challenge challenges={dailyChallenges} />}
        </Container>
      </Content>
      </ScrollView>
      
    
    </LinearGradient>
    
  );
};

export default Challenges;
