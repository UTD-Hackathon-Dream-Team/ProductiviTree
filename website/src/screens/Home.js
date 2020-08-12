import React from "react";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import { CardMedia } from "@material-ui/core";
import "../Home.css";
import tree from "../assets/tree_icon.png";

function Home() {
  return (
    <div>
      <div style={{ height: "100vh" }} /* fill screen for now */>
        <Iframe url="http://www.youtube.com/embed/r2eyxjckIYY" width="100%" height="100%" />
      </div>
      <div style={{ background: "linear-gradient(to right bottom, #C8F0EE, #A1C6F1)" }}>
        <div className="parent">
          <div className="section">
            <p>
              Stay happy, healthy, and productive by keeping track of your exercise, studying, and
              more!
            </p>
            <div>
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
          <div className="section">
            <img style={{ width: "50%", width: "50%" }} alt="Tree" src={tree} />
            <div>
              <Link to="/about">
                <button> About Us </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="parent">
          <div className="section">
            <div>
              <img style={{ width: "50%", width: "50%" }} alt="Tree" src={tree} />
            </div>
            <div>
              <Link to="/feed">
                <button> Feed </button>
              </Link>
            </div>
          </div>
          <div className="section">
            <p>Check up on your friends to make sure they’re doing well!</p>
            <div>
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
        </div>
        <div className="parent">
          <div className="section">
            <p>Gain points to plant trees and help the environment!</p>
            <div>
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
          <div className="section">
            <div>
              <img style={{ width: "50%", width: "50%" }} alt="Tree" src={tree} />
            </div>
            <div>
              <Link to="/stats">
                <button> Statistics </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
