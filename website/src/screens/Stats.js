import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";
import PublicLeaderBoard from "../components/PublicLeaderBoard";

function Stats() {
  const auth = useContext(AuthContext);
  const [view, setView] = useState(0);

  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      {auth.isLoggedIn ? (
        <div>
          <GoogleLogOut />
          <div>
            <Button variant="outlined" color="primary" onClick={() => setView(0)}>
              Public Stats
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setView(1)}>
              Your Stats
            </Button>
          </div>
          <div>{view == 0 ? <PublicLeaderBoard /> : <PublicLeaderBoard />}</div>
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
