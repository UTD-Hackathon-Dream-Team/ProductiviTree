import React from "react";
import { CardMedia } from "@material-ui/core";
import "../about.css";

function About() {
  return (
    <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
      <section className="info">
        <h1> The Problem </h1>
        <div className="divider"></div>
        <p>
          Most people often find it difficult to stay motivated and productive, and quarantine has
          only served to exacerbate this issue. Now, more than ever, it’s easy to lose track of time
          watching youtube videos or scrolling aimlessly through social media.
        </p>
        <p>
          Many of our peers feel lost and isolated, and this can be very damaging to mental health.
          With ProductiviTree, we aim to change that by incentivizing and sharing your productivity
          with your friends, creating an encouraging, supportive environment.
        </p>
      </section>
      <section className="info">
        <h1> The Solution </h1>
        <div className="divider"></div>
        <p>
          ProductiviTree is a mobile application where users can share ways that they stay healthy
          and productive during and after quarantine with their friends while also gaining points
          towards daily goals.
        </p>
        <p>
          Why do we want to share our productivity with others? Well, when I have to do homework by
          myself it can be hard to stay on task. But when I’m in a study group, we support one
          another and keep each other accountable. We want to recreate this kind of effect with more
          things, and on a bigger scale.
        </p>
        <p>
          On top of that, to further incentivize productivity, the user can gain points for doing
          tasks in the categories of self-care, community, fitness, and productivity. The
          accumulated points will automatically be redeemed to plant trees, so users can help the
          environment while helping themselves.
        </p>
      </section>
      <section className="devs">
        <h1> The Developers </h1>
        <div className="divider"></div>
        <div className="dev-wrapper">
          <div className="dev">
            <CardMedia image={require("../assets/Mei.png")} style={{ height: 260, width: 180 }} />
            <h3>Megan Tran</h3>
          </div>
          <div className="dev">
            <CardMedia image={require("../assets/Reshmi.png")} style={{ height: 260, width: 180 }} />
            <h3>Reshmi Ranjith</h3>
          </div>
          <div className="dev">
            <CardMedia image={require("../assets/Saloni.png")} style={{ height: 260, width: 180 }} />
            <h3>Saloni Shivdasani</h3>
          </div>
          <div className="dev">
            <CardMedia image={require("../assets/Vincent.png")} style={{ height: 260, width: 180 }} />
            <h3>Vincent Vu</h3>
          </div>
        </div>

      </section>
      <div className="btn-wrapper">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ReshmiCode/ProductiviTree/releases/tag/untagged-132d1301bec1736eeada"
          style={{marginRight:"1rem"}}
        >
          <button>Release Notes</button>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ReshmiCode/ProductiviTree"
          style={{marginLeft:"1rem"}}
        >
          <button>Source Code</button>
        </a>
      </div>
    </div>
  );
}

export default About;
