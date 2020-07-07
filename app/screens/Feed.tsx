import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text , View} from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../AuthContext";
import PostCard from "../components/PostCard";

const axios = require("axios").default;

const Feed = () => {
  const auth = useContext(AuthContext);
  let [refreshing, setRefreshing] = useState(false);
  let [following, setFollowing] = useState([]);
  let [posts, setPosts] = useState([]);
  let [feed, setFeed] = useState([]);

  async function fetchData() {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    setFollowing(result.data.payload.Following);
    const response = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/posts`
    );
    setPosts(response.data.payload);
  }

  async function adjustData() {
    console.log("Following", following);
    await posts.forEach(post => {
      let author = post.Author;
      console.log("Author", author);
      if (following.includes(author)){
        let newFeed = feed;
        newFeed.push(post);
        setFeed(newFeed);
      }
    });
    setRefreshing(false);
  }

  useEffect(() => {
    fetchData();
    adjustData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    await fetchData();
    await adjustData();
  }, [refreshing]);

  return (
    <LinearGradient colors={["#C8F0EE", "#A1C6F1"]} style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {following &&
        <View>
        { feed.map(function (post, i) {
            return (
                <View key={ i }>
                    {posts && <PostCard post={ post }/>}
                </View>
            );
        })}
    </View>}
      </ScrollView>
    </LinearGradient>
  );
};

export default Feed;
