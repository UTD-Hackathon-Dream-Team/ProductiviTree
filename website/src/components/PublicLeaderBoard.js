import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "./GoogleLogIn";
import GoogleLogOut from "./GoogleLogOut";
const axios = require("axios").default;

function PublicLeaderBoard() {
  const auth = useContext(AuthContext);
  let [users, setUsers] = useState([]);
  let [pos, setPos] = useState(0);

  async function fetchData() {
    const result = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users`);
    const allUsers = result.data.payload;
    allUsers.sort(function (a, b) {
      return 1000 * b.Trees + b.Points - (1000 * a.Trees + a.Points);
    });
    var index = allUsers.findIndex((user) => user.googleID === auth.googleID);
    setPos(index);
    setUsers(allUsers);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const data = users.map((user, i) => (
    <div>
      <h2>{i + 1}</h2>
      <h3>{user.Username}</h3>{" "}
      <p>
        Trees: {user.Trees} Points: {user.Points}
      </p>
    </div>
  ));

  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      <ul>{data}</ul>
    </div>
  );
}

export default PublicLeaderBoard;
