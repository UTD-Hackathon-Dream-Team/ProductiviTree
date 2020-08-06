import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  googleID: null,
  login: (googleID) => {},
  logout: () => {},
});
