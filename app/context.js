import { createContext } from "react";

export const Context = createContext({
  isLoggedIn: false,
  accesstoken: null,
  googleID: null,
  login: () => {},
  logout: () => {},
});