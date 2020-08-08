import React from "react";
import { Card, CardHeader, CardMedia, CardContent } from "@material-ui/core";
import "../Stats.css"

function BoardPosition(props) {
  return (
    <Card className="card" style={{borderRadius:"3.5rem"}}>
      <CardContent className="cardContent" >
        <h3 className="pos"> #{props.pos}</h3>
        <div className="profpic">
          <CardMedia
            image={props.user.ProfilePic}
            style={{ height: 50, width: 50, borderRadius: 30, margin: "auto 2rem auto 2rem" }}
          />
        </div>
        <h4 className="name">{props.user.Username}</h4>
        <div className="points">
          <CardMedia
            image={require("../assets/tree_icon.png")}
            style={{ height: 50, width: 50, margin: "auto 10px auto 10px" }}
          />
          <h5>{props.user.Trees}</h5>
          <CardMedia
            image={require("../assets/study_icon.png")}
            style={{ height: 50, width: 50, margin: "auto 10px auto 10px" }}
          />
          <h5>{props.user.Points}</h5>
        </div>
      </CardContent>
    </Card>
  );
}

export default BoardPosition;
