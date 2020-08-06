import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader } from "@material-ui/core";

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
        <CardHeader
          avatar={<img style={{ height: 30, width: 30, borderRadius: 30 }} src={user.ProfilePic} />}
          title={user.Username}
        />
      </Card>
    </div>
  );
}

export default Post;
