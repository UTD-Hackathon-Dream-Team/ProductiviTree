import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";
import PublicFeed from "../components/PublicFeed";
import YourPosts from "../components/YourPosts";
import YourFeed from "../components/YourFeed";

function Feed() {
  const auth = useContext(AuthContext);

  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      {auth.isLoggedIn ? (
        <div style={{ textAlign: "center" }}>
          <GoogleLogOut />
          {/* <PublicFeed /> */}
          <YourFeed />
          {/* <YourPosts /> */}
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
