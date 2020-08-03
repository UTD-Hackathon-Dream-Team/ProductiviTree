import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import About from "./screens/About";
import Feed from "./screens/Feed";
import Stats from "./screens/Stats";

function App() {
  return (
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
  );
}

export default App;
