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
    <Card>
      <Card.Body>
        <table>
          <tbody>
            <tr className="shot">
              <td className="shot-item">
                <Button
                  variant="none"
                  disabled={history.length === 0}
                  onClick={popLastShot}
                >
                  <i className="bi bi-arrow-counterclockwise"></i>&nbsp;
                </Button>
              </td>
              <td className="shot-item">
                {history.filter((s) => !!s).length}/{history.length}
              </td>
              <td className="shot-item">
                <span className="distance-circle">
                  <span>{distance + unit}</span>
                </span>
              </td>
              <td className="shot-item">
                <Button variant="success" onClick={addMake}>
                  <i className="bi bi-plus-circle-fill"></i>
                </Button>
              </td>
              <td className="shot-item">
                <Button variant="danger" onClick={addMiss}>
                  <i className="bi bi-dash-circle-fill"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}

export default ShotInterval;
