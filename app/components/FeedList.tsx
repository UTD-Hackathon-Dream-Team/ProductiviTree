import React, { useState, useEffect } from "react";
import { View } from "native-base";
import PostCard from "./PostCard";

const axios = require("axios").default;

const FeedList = (props) => {
  const posts = props.posts;

  return (
    <View>
        { posts.map(function (post, i) {
            return (
                <View key={ i }>
                    {posts && <PostCard post={ post }/>}
                </View>
            );
        })}
    </View>
  );
};

export default FeedList;