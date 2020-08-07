import React from "react";
import { Card, CardHeader, CardMedia, CardContent } from "@material-ui/core";

function BoardPosition(props) {
  return (
    <Card style={{ width: "fit-content" }}>
      <CardContent style={{ display: "flex" }}>
        <h3> #{props.pos}</h3>
        <CardMedia
          image={props.user.ProfilePic}
          style={{ height: 30, width: 30, borderRadius: 30 }}
        />
        <h4>{props.user.Username}</h4>
        <CardMedia
          image={require("../assets/tree_icon.png")}
          style={{ height: 30, width: 30, borderRadius: 30 }}
        />
        <p>{props.user.Trees}</p>
        <CardMedia
          image={require("../assets/study_icon.png")}
          style={{ height: 30, width: 30, borderRadius: 30 }}
        />
        <p>{props.user.Points}</p>
      </CardContent>
    </Card>
  );
}

export default BoardPosition;
