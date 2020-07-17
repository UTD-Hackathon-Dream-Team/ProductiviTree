import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text } from "native-base";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import ChallengeList from "../components/ChallengeList";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";

const axios = require("axios").default;

var styles = {
  listBox: {
    backgroundColor: "#ff8",
    margin: 20,
    height: 250,
  },
  header: {
    textAlign: "center",
    fontSize: 32,
    padding: 20,
  },
};

const Challenges = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [dailyChallenges, setDailyChallenges] = useState([null]);
  let [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    console.log(result.data.payload);
    setUser(result.data.payload);
    setDailyChallenges(dailyChallenges);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
  }, [refreshing]);

  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={props.navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Content>
          <Text style={styles.header}>Challenges</Text>
          <Text style={styles.header}>Weekly</Text>
          <Container style={styles.listBox}>
            {user && <ChallengeList challenges={dailyChallenges} user={user} />}
          </Container>
          <Text style={styles.header}>Daily</Text>
          <Container style={styles.listBox}>
            {user && <ChallengeList challenges={dailyChallenges} user={user} />}
          </Container>
        </Content>
      </ScrollView>
    </LinearGradient>
  );
};

export default Challenges;
