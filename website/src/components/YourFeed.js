import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import Post from "./Post";
import { Grid } from "@material-ui/core";
const axios = require("axios").default;

function YourFeed() {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
      );
      const following = result.data.payload.Following;
      const response = await axios(`https://productivitree.wl.r.appspot.com/api/v1/posts`);
      const posts = response.data.payload;
      const newFeed = [];
      posts.forEach((post) => {
        let author = post.Author;
        if (following.includes(author)) {
          newFeed.push(post);
        }
      });
      setPosts(newFeed.reverse());
    };
    fetchData();
  }, []);

  return (
    <Grid container style={{ textAlign: "center" }}>
      {posts.map((post) => (
        <div style={{ margin: 10 }}>
          <Post post={post._id} key={post._id} />
        </div>
      ))}
    </Grid>
  );
}

export default YourFeed;
