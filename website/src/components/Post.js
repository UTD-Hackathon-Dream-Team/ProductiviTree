import React, { useState, useEffect, useContext } from "react";
const axios = require("axios").default;

function Post(props) {
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/posts/${props.post}`
      );
      setPost(result.data.payload);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>{post.Caption}</h1>
    </div>
  );
}

export default Post;
