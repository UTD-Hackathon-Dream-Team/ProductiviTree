import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";
import PublicLeaderBoard from "../components/PublicLeaderBoard";

function Stats() {
  const auth = useContext(AuthContext);

  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      {auth.isLoggedIn ? (
        <div>
          <GoogleLogOut />
        </div>
      ) : (
        <div>
          <GoogleLogIn /> To View Your Stats
          <h1>Global Leaderboard</h1>
          <PublicLeaderBoard />
        </div>
      )}
    </div>
  );
}

export default Stats;
