//SOurce: https://github.com/ReshmiCode/mern-app/blob/master/src/shared/context/auth-context.js

import { createContext } from "react";

export const context = createContext({
  accesstoken: null,
  googleID: null,
  login: (googleID, accesstoken) => {},
  logout: () => {},
});