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

export default PublicFeed;
