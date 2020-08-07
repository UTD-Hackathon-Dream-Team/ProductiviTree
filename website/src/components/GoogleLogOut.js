import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";

import { AuthContext } from "../AuthContext";
import { CLIENT_ID } from "../config";

const GoogleLogOut = () => {
  const auth = useContext(AuthContext);

  const responseGoogleLogOut = (response) => {
    auth.logout();
  };

  return (
    <GoogleLogout
      clientId={CLIENT_ID}
      buttonText="Sign out of Google"
      onLogoutSuccess={responseGoogleLogOut}
      cookiePolicy={"single_host_origin"}
      theme="dark"
    />
  );
};

export default GoogleLogOut;
