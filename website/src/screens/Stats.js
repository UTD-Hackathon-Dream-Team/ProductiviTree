import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";
import PublicStats from "../components/PublicStats";
import YourStats from "../components/YourStats";
import "../Stats.css";

function Stats() {
  const auth = useContext(AuthContext);
  const [view, setView] = useState(0);

  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      {auth.isLoggedIn ? (
        <div className="body">
          <GoogleLogOut />
          <div>
            <Button variant="outlined" color="primary" onClick={() => setView(0)}>
              Public Stats
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setView(1)}>
              Your Stats
            </Button>
          </div>
          <div>{view == 0 ? <PublicStats /> : <YourStats />}</div>
        </div>
      ) : (
        <div className="body">
          <GoogleLogIn />
          <p>
          To View Your Stats
          </p>
          <PublicStats />
        </div>
      )}
    </div>
  );
}

export default Stats;
