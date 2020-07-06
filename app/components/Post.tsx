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

const PostCard = () => {

    const axios = require("axios").default;

    let [post, setPost] = useState({});
    
    useEffect(() => {
        async function fetchData() {
            const result = await axios(
              `https://productivitree.wl.r.appspot.com/api/v1/posts/5effd148c368a5ee46cf232f`
            );
            setPost(result.data.payload);
        }
        fetchData();
        console.log(post.Picture);
    }, []);

  return (
    <Card>
      <CardItem>
        <Left>
          {/* <Thumbnail
            source={{
              uri: post.profilePic,
            }}
          /> */}
          <Body>
            <Text>{post.Author}</Text>
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