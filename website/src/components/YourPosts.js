import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import Post from "./Post";
import { Grid } from "@material-ui/core";
const axios = require("axios").default;

function YourPosts() {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/posts/user/${auth.googleID}`
      );
      setPosts(result.data.payload);
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

export default YourPosts;
