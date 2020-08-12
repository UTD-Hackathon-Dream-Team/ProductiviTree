import React, { useState, useEffect, useContext } from "react";
import { CardMedia } from "@material-ui/core";
import { AuthContext } from "../AuthContext";
import BoardPosition from "./BoardPosition";
import "../Stats.css";

const axios = require("axios").default;

function YourStats() {
  const auth = useContext(AuthContext);
  let [users, setUsers] = useState([]);
  let [self, setSelf] = useState([]);
  let [trees, setTrees] = useState(0);
  let [pos, setPos] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users/`);
      const allUsers = result.data.payload;
      let totalTress = 0;
      allUsers.forEach((otherUser) => {
        totalTress += otherUser.Trees;
      });
      setTrees(totalTress);
      const response = await axios(
        `https://productivitree.wl.r.appspot.com/api/v1/users/${auth.googleID}`
      );
      setSelf(response.data.payload);
      const following = response.data.payload.Following;
      let friends = [];
      allUsers.forEach((user) => {
        if (following.includes(user.googleID)) {
          friends.push(user);
        }
      });
      friends.sort(function (a, b) {
        return 1000 * b.Trees + b.Points - (1000 * a.Trees + a.Points);
      });
      setUsers(friends);
      var index = friends.findIndex((user) => user.googleID === auth.googleID);
      setPos(index);
    }
    fetchData();
  }, []);

  return (
    <div className="stats-wrapper">
      <div className="stats">
        <div>
          <CardMedia image={require("../assets/tree_icon.png")} style={{ height: 500, width: 500 }} />
          <h1> {self.Trees} Trees Planted By You</h1>
          <h2> {trees} Total Trees Planted</h2>
        </div>
      </div>
      <div className="stats">
        <div style={{ width: "70%" }}>
          <BoardPosition user={self} pos={pos + 1}/>
          <div className="divider"></div>
          {users.map((user, i) => (
            <BoardPosition user={user} pos={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourStats;
