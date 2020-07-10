import React, { useState, useEffect } from "react";
import { View } from "native-base";
import PostCard from "./PostCard";


const FeedList = (props) => {
  const posts = props.posts;

  return (
    <View>
        { posts && posts.map(function (post, i) {
            return (
                <View key={ i }>
                    {post && <PostCard post={ post }/>}
                </View>
            );
        })}
    </View>
  );
};

export default FeedList;