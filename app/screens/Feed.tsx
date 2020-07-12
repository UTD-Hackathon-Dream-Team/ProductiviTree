import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text , View} from "native-base";
import { ScrollView, RefreshControl, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../AuthContext";
import PostCard from "../components/PostCard";
import FeedList from "../components/FeedList";

const axios = require("axios").default;

const Feed = () => {
  const auth = useContext(AuthContext);
  let [refreshing, setRefreshing] = useState(false);
  let [following, setFollowing] = useState([]);
  let [posts, setPosts] = useState([]);
  let [feed, setFeed] = useState([]);

  async function fetchData() {
    //setRefreshing(true);
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
    const newFeed = [];
    await posts.forEach(post => {
      let author = post.Author;
      if (following.includes(author)){
        newFeed.push(post);
      }
    });
    setFeed(newFeed.reverse());
    //setRefreshing(false);
  }

  useEffect(() => {
    async function loadData() {
      // await fetchData();
      // await adjustData();
      await onRefresh();
    }
    loadData();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    await adjustData();
    setRefreshing(false);
  }, [refreshing]);

  return (
    <LinearGradient colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]} style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {feed && <FeedList posts={feed}/>}
      </ScrollView>
    </LinearGradient>
  );
};

export default Feed;
