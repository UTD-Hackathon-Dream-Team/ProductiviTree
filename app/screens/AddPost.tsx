import React, { useState , useEffect } from "react";
import { Container, Body, Content, Header, Title, Button, Card, Icon, Right, Textarea, Item, Text, Segment, Form,Toast, Root, Left, } from "native-base";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const axios = require("axios").default;

const AddPost = (props) => {
  const [category, setCategory] = useState(0);
  const [enteredText, setEnteredText] = useState("");
  const [image, setImage] = useState("https://wp-rocket.me/wp-content/uploads/1/placeholder-feature-image.png");

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const submitPost = () => {
    console.log("Submit post");
  };

//   const submitPost = () => {
//     let prevPoints;
//     axios
//       .get(`https://earthxhacks2020.wl.r.appspot.com/users/${GLOBAL.id}`)
//       .then((response) => {
//         prevPoints = response.data.data[0].points;
//         axios.post("https://earthxhacks2020.wl.r.appspot.com/posts", {
//           user_id: GLOBAL.userID,
//           image: image,
//           description: enteredText,
//           category: categoryList[category],
//           profilePic: response.data.data[0].profilePic,
//           userName: response.data.data[0].userName,
//         });
//       })
//       .then(() =>
//         axios.patch(
//           `https://earthxhacks2020.wl.r.appspot.com/users/${GLOBAL.id}`,
//           {
//             points: prevPoints + 10,
//           }
//         )
//       )
//       .then(function (response) {
//         Toast.show({
//           text: "You've earned 10 points!",
//           buttonText: "Okay",
//           position: "bottom",
//         });
//         setTimeout(() => {
//           props.navigation.goBack();
//         }, 1000);
//       })
//       .catch(function (error) {
//         console.log(error);
//         Toast.show({
//           text: `There was an error: ${error}. Please try again later.`,
//           buttonText: "Okay",
//           position: "bottom",
//         });
//       });
//   };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <Root>
      <Container>
        <LinearGradient
          colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
          style={{ flex: 1 }}
        >
          <Content padder>
            <Card>
              <Form style={{ padding: 20 }}>
              <Button  onPress={_pickImage}>
                <Text>Add Image</Text>
              </Button>
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
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