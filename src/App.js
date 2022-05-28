import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import Putterade from "./Putterade";
import "bootstrap-icons/font/bootstrap-icons.css";
import StatTracker from "./StatTracker";

function App() {
  return (
    <div className="Site">
      <header className="App-header">
        <div className="app-header-container">
          <span>Putterade</span>
          <div className="app-header-right">
            <StatTracker key="1" placement="end" name="end"></StatTracker>
          </div>
        </div>
      </header>
      <Putterade></Putterade>
      <footer>Putterade 2022</footer>
    </div>
  );
}

export default App;
