import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";

function Feed() {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h1> Feed </h1>
      {auth.isLoggedIn ? <GoogleLogOut /> : <GoogleLogIn />}
    </div>
  );
}

export default Feed;
