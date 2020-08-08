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
    <Grid container style={{ backgroundColor: "white" }}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {posts.map((post) => (
            <Grid key={post._id} item>
              <Post post={post._id} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default YourFeed;
