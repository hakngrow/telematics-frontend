import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddDriver from "./components/AddDriver";
import Driver from "./components/Driver";
import DriversList from "./components/DriversList";

import PerformancesList from "./components/PerformancesList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/drivers" className="navbar-brand">
          AXA Telematics
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/drivers"} className="nav-link">
              Drivers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/performances"} className="nav-link">
              Performances
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/drivers"]} component={DriversList} />
          <Route exact path="/add" component={AddDriver} />
          <Route path="/drivers/:id" component={Driver} />

          <Route exact path={"/performances"} component={PerformancesList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
