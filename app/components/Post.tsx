import React, { useState, useEffect } from "react";
import { View } from "native-base";
import PostCard from "./PostCard";

const axios = require("axios").default;

const Post = (props) => {
  let [posts, setPosts] = useState([]);

  async function fetchData() {
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/posts/user/${props.user}`
    );
    setPosts(result.data.payload);
  }

  useEffect(() => {
    fetchData();
  }, []);

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

export default Post;