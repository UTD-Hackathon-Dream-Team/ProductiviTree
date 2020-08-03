import React, { useContext, useState, useEffect } from "react";
import { Container, Content, Text, View, Body, Title, Button, ListItem } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Switch, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";
import GoogleLogOut from "../components/GoogleLogOut";

const axios = require("axios").default;

const Settings = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  async function fetchData() {
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setUser(result.data.payload);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function goToProfile() {
    props.navigation.push("Profile");
  }

  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={props.navigation} backButton={true} />
      {user && (
        <Content padder>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: user.ProfilePic,
              }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 25, padding: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Username:</Text>
            {user.Username}
          </Text>
          <Text style={{ fontSize: 25, padding: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Bio:</Text>
            {user.Bio}
          </Text>
          <Text style={{ fontSize: 25, padding: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Daily Points Goal:</Text>
            {user.DailyGoal}
          </Text>

          <View style={{ padding: 10 }}>
            <Button
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={goToProfile}
            >
              <Text>Save Changes</Text>
            </Button>
          </View>
          <View style={{ padding: 10 }}>
            <GoogleLogOut navigate={props.navigation.push} />
          </View>

          {/* <View>
            <ListItem>
              <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "left" }}>
                Push Notifications  
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />          
            </ListItem>
            <ListItem>
              <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "left" }}>
                Email Notifications  
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />    
            </ListItem>
          </View>   */}
        </Content>
      )}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
  },
});

export default Settings;
