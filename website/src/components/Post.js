import React, { useState, useEffect, useContext } from "react";
import { Card } from "@material-ui/core";

const axios = require("axios").default;

function Post(props) {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/posts/${props.post}`
      );
      setPost(result.data.payload);
      const response = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${result.data.payload.Author}`
      );
      setUser(response.data.payload);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Card>
        <h1>{post.Caption}</h1>
        <p>User: {user.Username}</p>
      </Card>
    </div>
  );
}

export default Post;
