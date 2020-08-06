import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
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
    <div>
      {posts.map((post) => (
        <div style={{ margin: 10 }}>
          <Post post={post._id} key={post._id} />
        </div>
      ))}
    </div>
  );
}

export default PublicFeed;
