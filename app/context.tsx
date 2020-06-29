import { createContext } from "react";

export const context = createContext({
  isLoggedIn: false,
  accesstoken: null,
  googleID: null,
  login: (googleID, accesstoken) => {},
  logout: () => {},
});