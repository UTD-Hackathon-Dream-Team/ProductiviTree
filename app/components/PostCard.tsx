import React, {useState, useEffect} from "react";
var moment = require("moment");
import { Image } from "react-native";
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
const axios = require("axios").default;

const PostCard = (props) => {

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

  return (
    <Card>
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
        {/* <Right>
          <Icon name={post.category} />
        </Right> */}
      </CardItem>
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
          <Button transparent>
            {/* <Text>{post.Likes.length}</Text> */}
            <Icon name="md-thumbs-up" />
          </Button>
        </Right>
      </CardItem>
      <CardItem>
        <Text style={{ marginBottom: 20, marginLeft: 10 }}>
          {post.Caption}
        </Text>
      </CardItem>
    </Card>
  );
};

export default PostCard;