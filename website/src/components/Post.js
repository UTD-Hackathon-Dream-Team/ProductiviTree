import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader, CardMedia, CardContent } from "@material-ui/core";

var moment = require("moment");
const axios = require("axios").default;

function Post(props) {
  const [post, setPost] = useState({});
  const [activity, setActivity] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/posts/${props.post}`
      );
      setPost(result.data.payload);
      setActivity(result.data.payload.Activity);
      const response = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${result.data.payload.Author}`
      );
      setUser(response.data.payload);
    };
    fetchData();
  }, []);

  return (
    <div>
      {post && (
        <Card>
          <CardHeader
            avatar={
              <img style={{ height: 30, width: 30, borderRadius: 30 }} src={user.ProfilePic} />
            }
            title={user.Username}
            subheader={moment(post.TimeStamp).fromNow()}
          />
          <CardMedia image={post.Picture} style={{ height: 300, width: 400, flex: 1 }} />
          <CardContent>
            <p>{post.Caption}</p>
            <p>
              Activity: {activity.Activity} ( {activity.Category} )
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Post;
