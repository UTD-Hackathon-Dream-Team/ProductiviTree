import React, { useContext, useState, useEffect } from "react";
import { Container, Content, Text, View, Body, Title, Button, ListItem, Textarea, Form, Toast, Root} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Switch, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";
import GoogleLogOut from "../components/GoogleLogOut";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const axios = require("axios").default;

const Settings = (props) => {
  const auth = useContext(AuthContext);
  let [user, setUser] = useState(null);
  let [userName, setUserName] = useState("");
  let [bio, setBio] = useState("");
  let [dailyGoal, setDailyGoal] = useState("");
  let [image, setImage] = useState( "" );
  const [isEnabled, setIsEnabled] = useState(false);
  let [img64, setImg64] = useState(null);
  let [imageURL, setImageURL] = useState(null);

  const getPickerPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  async function fetchData() {
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setUser(result.data.payload);
    setUserName(result.data.payload.Username);
    setBio(result.data.payload.Bio);
    setDailyGoal(result.data.payload.DailyGoal);
    setImage(result.data.payload.ProfilePic);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const updateUser = async () => {
    await getImageURL();
    await axios
      .patch(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, {
        ProfilePic: imageURL,
        Username: userName,
        Bio: bio,
        DailyGoal: dailyGoal
      })
      .then(function (response) {
        props.navigation.navigate("Profile");
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          text: `There was an error. Please try again later.`,
          buttonText: "Okay",
          position: "bottom",
        });
      });
  }

  const getImageURL = async () => {
    const data = new FormData();
    data.append("file", "data:image/jpeg;base64," + img64);
    data.append("upload_preset", "productivitree");
    data.append("cloud_name", "utd-hdt");
    await fetch("https://api.cloudinary.com/v1_1/utd-hdt/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
        setImageURL(data.secure_url);
      });
  };

  const pickImage = async () => {
    try {
      await getPickerPermission();
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        quality: 1,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setImg64(result.base64);
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <Header navigation={props.navigation} backButton={true} />
      {user && (
        <Content padder>
          <Form>
            <TouchableOpacity style={{ alignItems: "center" }} onPress={pickImage}>
              <Image
                source={{
                  uri: image,
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
            <Root>
              <Button
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={() => updateUser()}
              >
                <Text>Save Changes</Text>
              </Button>
            </Root>
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
