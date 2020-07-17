import React, { useState, useEffect, useContext } from "react";
var moment = require("moment");
import { Image, TouchableOpacity } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import { AuthContext } from "../AuthContext";
const axios = require("axios").default;

const PostCard = (props) => {
  const auth = useContext(AuthContext);
  const post = props.post;
  let [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${post.Author}`
      );
      setUser(result.data.payload);
    }
    fetchData();
  }, []);

  function goToUser() {
    props.navigation.navigate("FriendProfile", { user: user.googleID });
  }

  function likePost() {
    console.log(`Post ${post._id} liked / unliked by ${auth.googleID}`);
  }

  return (
    <Card>
      <CardItem button onPress={goToUser}>
        <Left>
          <Thumbnail
            source={{
              uri: user.ProfilePic,
            }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 30,
            }}
          />
          <Body>
            <Text>{user.Username}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: post.Picture }}
          style={{ height: 300, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Text>{moment(post.TimeStamp).fromNow()}</Text>
        </Left>
        <Right>
          <Button transparent onPress={likePost}>
            <Text>{post.Likes.length}</Text>
            <Icon name="md-thumbs-up" />
          </Button>
        </Right>
      </CardItem>
      <CardItem>
        <Text> {post.Caption} </Text>
      </CardItem>
      <CardItem>
        <Text>
          {" "}
          Activity: {post.Activity.Activity} ( {post.Activity.Category} ){" "}
        </Text>
      </CardItem>
    </Card>
  );
};

export default PostCard;
