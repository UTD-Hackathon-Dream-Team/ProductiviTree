//Source for google auth: https://docs.expo.io/versions/latest/sdk/google/
//Source for context: https://github.com/ReshmiCode/mern-app/blob/master/src/user/pages/Auth.js

import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import { CLIENT_ID } from "../config";

const axios = require("axios").default;

const GoogleAuth = () => {
  let [signedIn, setSignedIn] = useState(false);
  let [googleID, setGoogleID] = useState("");

  const responseGoogleSuccess = (response) => {
    console.log(response);
    setGoogleID(response.Ea);
    setSignedIn(true);
  };

  const responseGoogleFail = (response) => {
    console.log(response);
  };

  const responseGoogleLogOut = (response) => {
    setSignedIn(false);
  };

  function SignedIn() {
    //console.log("Google ID",googleID);
    return (
      <div>
        <p>These are your plants:</p>
        <UserPlants user={googleID} />
        <div className="button-area">
          <button>
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="LogOut"
              onLogoutSuccess={responseGoogleLogOut}
              //onFailure={responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            />
          </button>
        </div>
      </div>
    );
  }

  function SignedOut() {
    return (
      <div>
        <div className="button-area">
          <button>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            />
          </button>
        </div>
        <p>Want to see your plants? Login above with your Google account!</p>
      </div>
    );
  }

  return <div>{signedIn ? SignedIn() : SignedOut()}</div>;
};

export default GoogleAuth;
