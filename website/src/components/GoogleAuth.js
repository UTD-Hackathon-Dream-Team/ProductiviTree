import React, { useState, useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import { AuthContext } from "../AuthContext";
import { CLIENT_ID } from "../config";

const GoogleAuth = () => {
  const auth = useContext(AuthContext);

  const responseGoogleSuccess = (response) => {
    auth.login(response.googleId);
  };

  const responseGoogleFail = (response) => {
    console.log(response);
  };

  const responseGoogleLogOut = (response) => {
    auth.logout();
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

  return <div>{auth.isLoggedIn ? SignedIn() : SignedOut()}</div>;
};

export default GoogleAuth;
