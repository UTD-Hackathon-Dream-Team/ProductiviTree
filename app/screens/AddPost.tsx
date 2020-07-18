import React, { useState , useContext } from "react";
import { Container,Content, Button, Card, Textarea, Text, Form, Toast, Root } from "native-base";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { AuthContext } from "../AuthContext";

const axios = require("axios").default;

const AddPost = (props) => {
  const auth = useContext(AuthContext);
  const activity = props.activity;
  let [enteredText, setEnteredText] = useState("");
  let [image, setImage] = useState("https://wp-rocket.me/wp-content/uploads/1/placeholder-feature-image.png");
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

  const handleSubmit = async () => {
    await submitPost();
  }

  const updatePoints = async () => {
    const activityResponse = await axios(`https://productivitree.wl.r.appspot.com/api/v1/activities/${activity}`);
    const newPoints = activityResponse.data.payload.Points;
    const userResponse = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`);
    const oldPoints = userResponse.data.payload.Points;
    const oldTrees = userResponse.data.payload.Trees;
    axios.patch( `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, 
      {
        Points: oldPoints + newPoints,
      }
    )
    .then(function (response) {
      Toast.show({
        text: `You've earned ${newPoints} points!`,
        buttonText: "Okay",
        position: "bottom",
      });

      if ((oldPoints + newPoints) > 1000){
        axios.patch( `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`, 
          {
            Points: oldPoints + newPoints - 1000,
            Trees: oldTrees + 1
          }
        )
        Toast.show({
          text: `You've planted one more tree and earned ${newPoints} points!`,
          buttonText: "Okay",
          position: "bottom",
        });
      }
      setTimeout(() => {
        console.log("Go to feed / previous page here");
      }, 5000);
    })
  }

  const submitPost = async () => {
    console.log("Submit post");
    getImageURL();
    console.log("Image", imageURL);
    await axios.get(`https://productivitree.wl.r.appspot.com/api/v1/activities/${activity}`)
    .then((response) => {
      axios.post("https://productivitree.wl.r.appspot.com/api/v1/posts", {
        Author: auth.googleID,
        Picture: imageURL,
        Caption: enteredText,
        Activity: response.data.payload
      })
      .then(function (response) {
        updatePoints();
      })
      .catch(function (error) {
        console.log(error);
        Toast.show({
          text: `There was an error. Please try again later.`,
          buttonText: "Okay",
          position: "bottom",
        });
      });
    })
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
    .then((data) =>  {
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
        aspect: [4, 3]
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
        <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }} >
          <Content padder>
            <Card>
              <Form style={{ padding: 20 }}>
                <Button  onPress={pickImage}>
                  <Text>Add Image</Text>
                </Button>
                <Image source={{ uri: image }} style={{ height: 200, width: null, flex: 1 }} />
                <Textarea rowSpan={4} rounded bordered placeholder="Caption" onChangeText={(message) => setEnteredText(message)} />
              </Form>
              <Button onPress={() => handleSubmit()}>
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