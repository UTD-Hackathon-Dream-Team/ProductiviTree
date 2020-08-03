import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Home from "./screens/Home";
import About from "./screens/About";
import Feed from "./screens/Feed";
import Stats from "./screens/Stats";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
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
    </Router>
  );
}

export default App;
