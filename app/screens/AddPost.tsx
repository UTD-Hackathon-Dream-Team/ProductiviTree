import React, { useState , useEffect } from "react";
import { Container, Body, Content, Header, Title, Button, Card, Icon, Right, Textarea, Item, Text, Segment, Form,Toast, Root, Left, } from "native-base";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const axios = require("axios").default;

const AddPost = (props) => {
  let [category, setCategory] = useState(0);
  let [enteredText, setEnteredText] = useState("");
  let [image, setImage] = useState("https://wp-rocket.me/wp-content/uploads/1/placeholder-feature-image.png");
  let [img64, setImg64] = useState(null);
  let [imageURL, setImageURL] = useState(null);
  let [loading, setLoading] = useState(false);

  const getPickerPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

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



    const pickImage = async () => {
        try {
        await getPickerPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            quality: 1,
            //TODO: FInd aspect
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
        <LinearGradient
          colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
          style={{ flex: 1 }}
        >
          <Content padder>
            <Card>
              <Form style={{ padding: 20 }}>
              <Button  onPress={pickImage}>
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