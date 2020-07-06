import React, {useState, useEffect, useContext} from "react";
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
  let [activity, setActivity] = useState({});
  
  useEffect(() => {
    async function fetchData() {
        const result = await axios(
          `https://productivitree.wl.r.appspot.com/api/v1/users/${post.Author}`
        );
        setUser(result.data.payload);
        const response = await axios(
          `https://productivitree.wl.r.appspot.com/api/v1/activities/${post.Activity}`
        );
        setActivity(response.data.payload);
    }
    fetchData();
  }, []);

  function goToUser() {
    console.log("User Page Here");
    console.log("User", user.googleID);
  }

  function likePost() {
    console.log(`Post ${post._id} liked / unliked by ${auth.googleID}`);
  }

  return (
    <Card style={{ borderRadius: 1000}}>
      <TouchableOpacity onPress={goToUser}>
        <CardItem>
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
      </TouchableOpacity>
      <CardItem cardBody >
        <Image
          source={{ uri: post.Picture }}
          style={{height: 200, width: null, flex: 1}}
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
        <Text> Activity: {activity.activity} ( {activity.category} ) </Text>
      </CardItem>
    </Card>
  );
};

export default PostCard;