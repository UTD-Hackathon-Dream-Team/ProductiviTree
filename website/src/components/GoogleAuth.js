import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import { CLIENT_ID } from "../config";

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
        <p>Logged In</p>
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Sign out of Google"
          onLogoutSuccess={responseGoogleLogOut}
          //onFailure={responseGoogleFail}
          cookiePolicy={"single_host_origin"}
          theme="dark"
        />
      </div>
    );
  }

  function SignedOut() {
    return (
      <div>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFail}
          cookiePolicy={"single_host_origin"}
          theme="dark"
        />
        <p>Want to see your personalized feed? Login above with your Google account!</p>
      </div>
    );
  }

  return <div>{signedIn ? SignedIn() : SignedOut()}</div>;
};

export default GoogleAuth;
