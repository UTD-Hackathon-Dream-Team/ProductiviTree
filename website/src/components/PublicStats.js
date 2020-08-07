import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import BoardPosition from "./BoardPosition";
const axios = require("axios").default;

function PublicStats() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(`https://productivitree.wl.r.appspot.com/api/v1/users`);
      const allUsers = result.data.payload;
      allUsers.sort(function (a, b) {
        return 1000 * b.Trees + b.Points - (1000 * a.Trees + a.Points);
      });
      setUsers(allUsers);
    }
    fetchData();
  }, []);

  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      {users.map((user, i) => (
        <BoardPosition user={user} pos={i + 1} />
      ))}
    </div>
  );
}

export default PublicStats;
