import React from "react";
import { Link } from "react-router-dom";
import { CardMedia } from "@material-ui/core";
import ReactPlayer from "react-player";
import treeImg from "../assets/tree_icon.png";
import "../Home.css";

function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)",
      }}
    >
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="https://youtu.be/A0GQYn6tABM"
          width="100%"
          height="100%"
        />
      </div>

      {/* Section 1 */}

      <div className="section">
        <div className="p-wrapper">
          <p style={{ fontSize: 36 }}>
            Stay happy, healthy, and productive by keeping track of your
            exercise, studying, and more!
          </p>
        </div>
        <div className="tree-wrapper">
          <img src={treeImg} className="tree" />
        </div>
        <div className="play-store">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.productivitree.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <img
              style={{ height: 75 }}
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
          <img
            style={{ height: 50 }}
            alt="Coming soon on App Store"
            src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-pre-order-on-the-app-store.svg"
          />
        </div>
        <Link to="/about" className="page-link">
          <button> About Us </button>
        </Link>
      </div>

      {/* Section 2 */}

      <div className="section">
        <div className="tree-wrapper">
          <img src={treeImg} className="tree" />
        </div>
        <div className="p-wrapper">
          <p style={{ fontSize: 36 }}>
            Check up on your friends to make sure they’re doing well!
          </p>
        </div>
        <Link to="/feed" className="page-link">
          <button> Feed </button>
        </Link>
        <div className="play-store">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.productivitree.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <img
              style={{ height: 75 }}
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
          <img
            style={{ height: 50 }}
            alt="Coming soon on App Store"
            src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-pre-order-on-the-app-store.svg"
          />
        </div>
      </div>

      {/* Section 3 */}

      <div className="section">
        <div className="p-wrapper">
          <p style={{ fontSize: 36 }}>
            Gain points to plant trees and help the environment!
          </p>
        </div>
        <div className="tree-wrapper">
          <img src={treeImg} className="tree" />
        </div>
        <div className="play-store">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.productivitree.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <img
              style={{ height: 75 }}
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
          <img
            style={{ height: 50 }}
            alt="Coming soon on App Store"
            src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-pre-order-on-the-app-store.svg"
          />
        </div>
        <Link to="/stats" className="page-link">
          <button> Statistics </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
