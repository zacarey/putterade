import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function ShotInterval(props) {
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

  const handleChange = (e) => {
    //
  };
  const distance = props.value.distance;
  const unit = props.value.unit;

  return (
    <Card className="shot-row-container" onChange={handleChange}>
      <Card.Body className="shot">
        <Button
          variant="none"
          disabled={history.length === 0}
          onClick={popLastShot}
        >
          <i className="bi bi-arrow-counterclockwise"></i>&nbsp;
        </Button>
        <span className="row-text">
          {history.filter((s) => !!s).length}/{history.length}
        </span>
        <Badge pill bg="primary" className="row-text">
          <span>{distance + unit}</span>
        </Badge>
        <Button variant="outline-success" onClick={addMake}>
          <i className="bi bi-plus-circle-fill"></i>
        </Button>
        <Button variant="outline-danger" onClick={addMiss}>
          <i className="bi bi-dash-circle-fill"></i>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ShotInterval;
