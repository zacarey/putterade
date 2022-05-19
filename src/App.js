import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ButtonGroup, Card, Button, Badge } from "react-bootstrap";
import ChooseCircle from "./ChooseCircle";
import "bootstrap-icons/font/bootstrap-icons.css";

function ShotAccuracy(props) {
  const [history, setHistory] = useState([]);

  const addMake = () => {
    setHistory((oldArray) => [...oldArray, true]);
  };

  const addMiss = () => {
    setHistory((oldArray) => [...oldArray, false]);
  };

  const popLastShot = () => {
    setHistory((oldArray) => [...oldArray.slice(0, -1)]);
  };

  return (
    <Card className="shot-row-container">
      <Card.Body className="shot">
        <Button
          variant="none"
          disabled={history.length === 0}
          onClick={popLastShot}
        >
          <i class="bi bi-arrow-counterclockwise"></i>&nbsp;
        </Button>
        <span className="row-text">
          {history.filter((s) => !!s).length}/{history.length}
        </span>
        <Badge pill bg="primary">
          <span className="row-text">2m</span>
        </Badge>
        <Button variant="outline-success" onClick={addMake}>
          <i className="bi bi-plus-circle-fill"></i>
        </Button>
        <Button variant="outline-danger" onClick={addMiss}>
          <i class="bi bi-dash-circle-fill"></i>
        </Button>
      </Card.Body>
    </Card>
  );
}

class Putterade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circle: "c1",
      distanceInterval: 2,
    };
  }

  handleCircleChange(i) {
    console.log(i);
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
        <ShotAccuracy></ShotAccuracy>
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
