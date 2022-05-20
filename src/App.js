import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { ButtonGroup, Card, Button, Badge } from "react-bootstrap";
import ChooseCircle from "./ChooseCircle";
import ShotInterval from "./ShotInterval";
import "bootstrap-icons/font/bootstrap-icons.css";

function emptyStats() {
  const stats = [];
  for (var i = 0; i < 10; i++) {
    stats.push({
      distance: (i + 1) * 2,
      unit: "m",
      make: 0,
      miss: 0,
    });
  }
  return stats;
}

class Putterade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circle: "c1",
      intervalDistance: 2,
      unitMeasurement: "m",
      stats: emptyStats(),
    };
  }

  renderAllIntervals() {
    const startingInterval = this.state.circle === "c2" ? 5 : 0;
    const offset = this.state.circle === "c1" ? 5 : 0;

    const rows = [];
    for (var i = startingInterval; i < 10 - offset; i++) {
      rows.push(
        <ShotInterval
          key={i}
          value={this.state.stats[i]}
          onChange={this.handleShotIntervalChange}
        ></ShotInterval>
      );
    }
    return rows;
  }

  handleShotIntervalChange(i) {
    console.log(i);
  }

  handleCircleChange(i) {
    this.setState({
      circle: i,
    });
  }

  render() {
    return (
      <div>
        <ChooseCircle
          onChange={(val) => this.handleCircleChange(val.target.value)}
        ></ChooseCircle>
        {this.renderAllIntervals()}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">Putterade</header>
      <Putterade></Putterade>
      <footer>Putterade 2022</footer>
    </div>
  );
}

export default App;
