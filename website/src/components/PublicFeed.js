import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import { Grid } from "@material-ui/core";
const axios = require("axios").default;

function PublicFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://productivitree.wl.r.appspot.com/api/v1/posts/`);
      setPosts(result.data.payload);
    };
    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <div style={{ margin: 10 }}>
          <Post post={post._id} key={post._id} />
        </div>
      ))}
    </Grid>
  );
}

export default PublicFeed;
