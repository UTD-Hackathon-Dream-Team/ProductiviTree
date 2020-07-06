import React, { useState, useEffect, useContext } from "react";
import { Container, Content, Text, View, Button } from "native-base";
import { ScrollView, RefreshControl, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthContext";
import ProfileInfo from "../components/ProfileInfo";
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
                <PostCard post={ post } key={ i }/>
            );
        })}
    </View>
  );
};

export default Post;