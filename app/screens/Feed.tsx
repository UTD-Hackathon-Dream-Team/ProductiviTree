import React, { useState, useEffect, useContext } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../AuthContext";
import Header from "../components/Header";
import FeedList from "../components/FeedList";

const axios = require("axios").default;

const Feed = (props) => {
  const auth = useContext(AuthContext);
  let [refreshing, setRefreshing] = useState(false);
  let [feed, setFeed] = useState(null);

  const fetchData = React.useCallback(async () => {
    setRefreshing(true);
    const result = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
    );
    const following = result.data.payload.Following;
    const response = await axios(
      `https://productivitree.wl.r.appspot.com/api/v1/posts`
    );
    const posts = response.data.payload;
    const newFeed: [] = [];
    posts.forEach((post: { Author: String }) => {
      let author = post.Author;
      if (following.includes(author)) {
        newFeed.push(post);
      }
    });
    setFeed(newFeed.reverse());
    setRefreshing(false);
  }, []);

  useEffect(() => {
    async function loadData() {
      await fetchData();
    }
    loadData();
  }, []);

  return (
    <LinearGradient
      colors={["#C8F0EE", "#c8e2f1", "#A1C6F1"]}
      style={{ flex: 1 }}
    >
      <Header navigation={props.navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => await fetchData()}
          />
        }
      >
        {feed && <FeedList posts={feed} />}
      </ScrollView>
    </LinearGradient>
  );
};

export default Feed;
