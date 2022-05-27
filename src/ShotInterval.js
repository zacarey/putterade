import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function getDateAsKey() {
  new Date().toISOString();
  return new Date().toISOString().split("T")[0];
}

function setLocalStorage(distance, unit, shots, sessionId) {
  const date = getDateAsKey();
  const distanceKey = distance + unit;
  let prevStorage = JSON.parse(localStorage.getItem(distanceKey));
  if (!prevStorage) prevStorage = {};

  const latestStats = {
    date: date,
    distance: distance,
    unit: unit,
    shotsMade: shots.filter((i) => !!i).length,
    shotsMissed: shots.filter((i) => !i).length,
  };

  delete prevStorage[sessionId];
  prevStorage[sessionId] = latestStats;

  localStorage.setItem(distanceKey, JSON.stringify(prevStorage));
  setStreakTracker(sessionId, shots);
}

function setStreakTracker(sessionId, currentShots) {
  return;
  let prev = JSON.parse(localStorage.getItem("putt-streak"));
  if (!prev) prev = { shots: [], carryOver: 0 };

  if (prev.sessionId !== sessionId) {
    prev.carryOver += prev.shots.length ?? 0;
    prev.shots = [];
  }

  prev.shots = currentShots;

  // logic
  const i = prev.shots.length;
  let streak = 0;
  while (i > 0) {
    if (!!prev.shots[i]) streak++;
    else continue;
    i--;
  }
  if (streak === prev.shots.length) streak += prev.carryOver;

  const currentStreak = prev.carryOver + prev.shots.filter((i) => !!i).length;
  if (prev.longestStreak < currentStreak) {
    prev.longestStreak = currentStreak;
  }

  prev.sessionId = sessionId;

  localStorage.setItem("putt-strea", JSON.stringify(prev));
}

function ShotInterval(props) {
  const [history, setHistory] = useState(props.value.shots);
  const distance = props.value.distance;
  const unit = props.value.unit;
  const sessionId = props.value.sessionId;

  const addMake = () => {
    setHistory((oldArray) => [...oldArray, true]);
    props.value.shots = [...props.value.shots, true];
    setLocalStorage(distance, unit, props.value.shots, sessionId);
  };

  const addMiss = () => {
    setHistory((oldArray) => [...oldArray, false]);
    props.value.shots = [...props.value.shots, false];
    setLocalStorage(distance, unit, props.value.shots, sessionId);
  };

  const popLastShot = () => {
    setHistory((oldArray) => [...oldArray.slice(0, -1)]);
    props.value.shots = [...props.value.shots.slice(0, -1)];
    setLocalStorage(distance, unit, props.value.shots, sessionId);
  };

  return (
    <Card className="shot-row-container">
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
        <div>
          <Button variant="none" onClick={addMake}>
            <i className="btn-icon-add bi bi-plus-circle-fill"></i>
          </Button>
          <Button variant="none" onClick={addMiss}>
            <i className="btn-icon-minus bi bi-dash-circle-fill"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ShotInterval;
