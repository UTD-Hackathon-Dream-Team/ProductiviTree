import React, { useState, useContext, useEffect } from "react";
import { Container, Content, Button, Card, Textarea, Text, Form, Toast, Root } from "native-base";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { AuthContext } from "../AuthContext";
import Header from "../components/Header";

const axios = require("axios").default;

const AddPost = (props) => {
  const auth = useContext(AuthContext);
  const activity = props.route.params.activity;
  let [enteredText, setEnteredText] = useState("");
  let [image, setImage] = useState(
    "https://wp-rocket.me/wp-content/uploads/1/placeholder-feature-image.png"
  );
  let [img64, setImg64] = useState(null);
  let [imageURL, setImageURL] = useState(null);
  let [oldPoints, setOldPoints] = useState(0);
  let [newPoints, setNewPoints] = useState(0);
  let [trees, setTrees] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const activityResponse = await axios(`https://productivitree.wl.r.appspot.com/api/v1/activities/${activity}`);
      setNewPoints(activityResponse.data.payload.Points);
      const userResponse = await axios( `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`);
      setOldPoints(userResponse.data.payload.Points);
      setTrees(userResponse.data.payload.Trees);
    };
    fetchData();
  }, []);

  const getPickerPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const updatePoints = async () => {
    if (oldPoints + newPoints > 1000) {
      await axios.patch(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, {
        Points: oldPoints + newPoints - 1000,
        Trees: trees + 1
      });
      Toast.show({
        text: `You've planted one more tree and earned ${newPoints} points!`,
        buttonText: "Okay",
        position: "bottom",
      });
    }
    else {
      await axios.patch(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, {
        Points: oldPoints + newPoints
      });
      Toast.show({
        text: `You've earned ${newPoints} points!`,
        buttonText: "Okay",
        position: "bottom",
      });
    }
  };

  const submitPost = async () => {
    //await getImageURL();
    let url;
    const data = new FormData();
    data.append("file", "data:image/jpeg;base64," + img64);
    data.append("upload_preset", "productivitree");
    data.append("cloud_name", "utd-hdt");
    await fetch("https://api.cloudinary.com/v1_1/utd-hdt/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log( "Inside getImageURL", data.secure_url);
        await setImageURL(data.secure_url);
        url = data.secure_url;
      });

    const newPost = await {
      Author: auth.googleID,
      Picture: url,
      Caption: enteredText,
      Activity: activity,
    };

    console.log(newPost);

    await axios
      .post("https://productivitree.wl.r.appspot.com/api/v1/posts", newPost)
      .then( async (response) => {
        await updatePoints();
        setTimeout(() => {
          props.navigation.navigate("Feed");
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          text: `There was an error. Please try again later.`,
          buttonText: "Okay",
          position: "bottom",
        });
      });
      
  };

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
      .then(async (data) => {
        console.log( "Inside getImageURL", data.secure_url);
        await setImageURL(data.secure_url);
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
    <Root>
      <Container>
        <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
          <Header navigation={props.navigation} backButton={true} />
          <Content padder>
            <Card>
              <Form style={{ padding: 20 }}>
                <Button onPress={pickImage}>
                  <Text>Add Image</Text>
                </Button>
                <Image source={{ uri: image }} style={{ height: 200, width: null, flex: 1 }} />
                <Textarea
                  rowSpan={4}
                  rounded
                  bordered
                  placeholder="Caption"
                  onChangeText={(message) => setEnteredText(message)}
                />
              </Form>
              <Button onPress={() => submitPost()}>
                <Text>Post!</Text>
              </Button>
            </Card>
          </Content>
        </LinearGradient>
      </Container>
    </Root>
  );
};

export default AddPost;
