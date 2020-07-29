import React, { useContext, useState, useEffect } from "react";
import { Container, Content, Text, View, Body, Title, Button, ListItem, Textarea, Form} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Switch, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";
import GoogleLogOut from "../components/GoogleLogOut";

const axios = require("axios").default;

const Settings = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [userName, setUserName] = useState("");
  let [bio, setBio] = useState("");
  let [dailyGoal, setDailyGoal] = useState("");
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

  const updateUser = async () => {
    await axios
      .patch(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, {
        Username: userName,
        Bio: bio,
        DailyGoal: dailyGoal
      })
      .then(function (response) {
        // Toast.show({
        //   text: `You've earned ${newPoints} points!`,
        //   buttonText: "Okay",
        //   position: "bottom",
        // });
        props.navigation.navigate("Profile");
      });
  }

  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={props.navigation} backButton={true} />
      {user && (
        <Content padder>
          <Form>
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

            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Username:</Text>
            <Textarea style={{ fontSize: 25 }} placeholder={user.Username} onChangeText={(newUserName) => setUserName(newUserName)} />

            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Bio:</Text>
            <Textarea style={{ fontSize: 25 }} placeholder={user.Bio} onChangeText={(newBio) => setBio(newBio)} />

            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Daily Points Goal:</Text>
            <Textarea style={{ fontSize: 25 }} placeholder={user.DailyGoal.toString()} onChangeText={(newGoal) => setDailyGoal(newGoal)} />
          </Form>

          <View style={{ padding: 10 }}>
            <Button
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => updateUser()}
            >
              <Text>Save Changes</Text>
            </Button>
          </View>

          <View style={{ padding: 10 }}>
            <GoogleLogOut navigate={props.navigation.navigate} />
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
