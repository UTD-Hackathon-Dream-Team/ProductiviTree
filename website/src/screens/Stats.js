import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import GoogleLogIn from "../components/GoogleLogIn";
import GoogleLogOut from "../components/GoogleLogOut";
import {API_URL} from "../config"
const axios = require("axios").default

function Stats() {
  const auth = useContext(AuthContext);
  let [users, setUsers] = useState([]);
  let [pos, setPos] = useState(0);

  async function fetchData() {
    const result = await axios(
      `${API_URL}/users`
    );
    const allUsers = result.data.payload;
    allUsers.sort(function(a, b) {
        return (1000*b.Trees + b.Points) - (1000*a.Trees + a.Points);
    });
    var index = allUsers.findIndex(user => user.googleID === auth.googleID);
    setPos(index);
    setUsers(allUsers);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const data = users.map((user, i) => <div><h2>{i+1}</h2><h3>{user.Username}</h3> <p>Points: {user.Points} Trees: {user.Trees}</p></div>);

  return (
    <div>
      <h1> Stats </h1>
      <h1>Global Leaderboard</h1>
      <ul>{data}</ul>
      {auth.isLoggedIn ? <GoogleLogOut /> : <GoogleLogIn />}
    </div>
  );
}

export default Stats;
