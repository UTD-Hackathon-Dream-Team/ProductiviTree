import React from "react";
import { Container, Content } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import PostCard from "./PostCard";

const FeedList = (props: { posts: [] }) => {
  const posts = props.posts;

  return (
    <Container>
      <LinearGradient
        colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
        style={{ flex: 1 }}
      >
        <Content padder>
          {posts && posts.map((post) => <PostCard post={post} />)}
        </Content>
      </LinearGradient>
    </Container>
  );
};

export default FeedList;
