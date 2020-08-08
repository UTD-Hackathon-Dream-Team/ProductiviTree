import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import { AuthContext } from "./AuthContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import About from "./screens/About";
import Feed from "./screens/Feed";
import Stats from "./screens/Stats";

function App() {
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  //login for context
  const login = useCallback((googleID) => {
    // useCallback so not rerendered
    setUserId(googleID);
    setLoggedIn(true);
  }, []);

  //logout for context
  const logout = useCallback(() => {
    setUserId(null);
    setLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        googleID: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
      <NavBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/stats" exact>
            <Stats />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
