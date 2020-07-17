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
    let [imageURL, setImageURL] = useState(null);

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
        getImageURL();
        console.log(imageURL);
    };

    const getImageURL = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "productivitree");
        data.append("cloud_name", "utd-hdt");
        fetch("https://api.cloudinary.com/v1_1/utd-hdt/image/upload", {
          method: "post",
          body: data,
        })
        .then((res) => res.json())
        .then((data) =>  setImageURL(data.secure_url));
      };

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