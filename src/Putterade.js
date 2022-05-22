import React from "react";
import ChooseCircle from "./ChooseCircle";
import ShotInterval from "./ShotInterval";

function emptyStats() {
  const stats = [];
  const sessionId = new Date().getTime(); //crypto.randomUUID(); doesn't work in safari??
  for (var i = 0; i < 10; i++) {
    stats.push({
      distance: (i + 1) * 2,
      unit: "m",
      shots: [],
      sessionId: sessionId,
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
        <ShotInterval key={i} value={this.state.stats[i]}></ShotInterval>
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

export default Putterade;
