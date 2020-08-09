import React from "react";
import Iframe from "react-iframe";

function Home() {
  return (
    <div style={{ height: "100vh" }} /* fill screen for now */>
      <Iframe url="http://www.youtube.com/embed/r2eyxjckIYY" width="100%" height="100%" />
    </div>
  );
}

export default Home;
