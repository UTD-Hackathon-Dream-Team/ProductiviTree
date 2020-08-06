import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";
import PublicFeed from "../components/PublicFeed";

function Feed() {
  const auth = useContext(AuthContext);

  return (
    <div
      style={{
        background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {auth.isLoggedIn ? (
        <div>
          <GoogleLogOut />
        </div>
      ) : (
        <div>
          <GoogleLogIn />
          <PublicFeed />
        </div>
      )}
    </div>
  );
}

export default Feed;
