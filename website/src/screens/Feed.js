import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Button } from "@material-ui/core";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";
import PublicFeed from "../components/PublicFeed";
import YourPosts from "../components/YourPosts";
import YourFeed from "../components/YourFeed";

function Feed() {
  const auth = useContext(AuthContext);
  const [view, setView] = useState(0);

  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      {auth.isLoggedIn ? (
        <div style={{ textAlign: "center" }}>
          <GoogleLogOut />
          <div>
            <Button variant="outlined" color="primary" onClick={() => setView(0)}>
              Public Feed
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setView(1)}>
              Your Feed
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setView(2)}>
              Your Posts
            </Button>
          </div>
          <div>{view == 0 ? <PublicFeed /> : view == 1 ? <YourFeed /> : <YourPosts />}</div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <GoogleLogIn /> To View Your Personalized Feed
          <PublicFeed />
        </div>
      )}
    </div>
  );
}

export default Feed;
