import React from "react";

function BoardPosition(props) {
  return (
    <div>
      <h2>{props.pos}</h2>
      <h3>{props.user.Username}</h3>{" "}
      <p>
        Trees: {props.user.Trees} Points: {props.user.Points}
      </p>
    </div>
  );
}

export default BoardPosition;
