import React from "react";
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

const PostCard = (props) => {
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail
            source={{
              uri: props.post.profilePic,
            }}
          />
          <Body>
            <Text>{props.post.userName}</Text>
          </Body>
        </Left>
        <Right>
          <Icon name={props.post.category} />
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: props.post.image }}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Text>{moment(props.post.date_added).fromNow()}</Text>
        </Left>
        <Right>
          <Button transparent>
            <Text>{props.post.likesCount}</Text>
            <Icon name="md-thumbs-up" />
          </Button>
        </Right>
      </CardItem>
      <CardItem>
        <Text style={{ marginBottom: 20, marginLeft: 10 }}>
          {props.post.description}
        </Text>
      </CardItem>
    </Card>
  );
};

export default PostCard;