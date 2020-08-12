import React, { useState, useEffect, useContext } from "react";
import { CardMedia } from "@material-ui/core";
import { AuthContext } from "../AuthContext";
import BoardPosition from "./BoardPosition";
import "../Stats.css";
import tree from "../assets/tree_icon.png";

const axios = require("axios").default;

function PublicStats() {
  let [users, setUsers] = useState([]);
  let [trees, setTrees] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users`);
      const allUsers = result.data.payload;
      allUsers.sort(function (a, b) {
        return 1000 * b.Trees + b.Points - (1000 * a.Trees + a.Points);
      });
      setUsers(allUsers);
      let totalTress = 0;
      allUsers.forEach((otherUser) => {
        totalTress += otherUser.Trees;
      });
      setTrees(totalTress);
    }
    fetchData();
  }, []);

  return (
    <div className="stats-wrapper">
      <div className="stats">
        <div>
          <img style={{ width: "50%", width: "50%" }} alt="Tree" src={tree} />
          <h1> {trees} Total Trees Planted</h1>
        </div>
      </div>
      <div className="stats">
        <div style={{ width: "70%" }}>
          {users.map((user, i) => (
            <BoardPosition user={user} pos={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicStats;
