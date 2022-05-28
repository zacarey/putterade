import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function getShootingPercentageColorGrade(i) {
  return i > 90 ? "purple" : i > 80 ? "green" : i > 70 ? "orange" : "red";
}

function StatData() {
  const intervalDistance = 2;
  const intervalUnit = "m";
  let totalMade = 0;
  let totalMissed = 0;
  let numberOfSessions = 0;
  let shotInterval = Array(10).fill({});
  const rows = [];

  for (var i = 0; i < 10; i++) {
    const distanceKey = (i + 1) * intervalDistance + intervalUnit;
    const data = JSON.parse(localStorage.getItem(distanceKey));

    shotInterval[i].distance = distanceKey;
    shotInterval[i].shotsMade = 0;
    shotInterval[i].shotsMissed = 0;

    for (var key in data) {
      numberOfSessions++;

      totalMade += data[key].shotsMade ?? 0;
      totalMissed += data[key].shotsMissed ?? 0;

      shotInterval[i].shotsMade += data[key].shotsMade;
      shotInterval[i].shotsMissed += data[key].shotsMissed;
    }
    const shootingPercentage = (
      (shotInterval[i].shotsMade /
        (shotInterval[i].shotsMade + shotInterval[i].shotsMissed)) *
      100
    ).toFixed(2);
    rows.push(
      <div key={i} className="stat-container">
        <p>
          {distanceKey}:{" "}
          {shotInterval[i].shotsMade +
            "/" +
            (shotInterval[i].shotsMade + shotInterval[i].shotsMissed)}{" "}
        </p>
        <b
          style={{ color: getShootingPercentageColorGrade(shootingPercentage) }}
        >
          {shootingPercentage >= 0 ? shootingPercentage + "%" : ""}
        </b>
      </div>
    );
  }

  const statTotal = totalMade + "/" + (totalMade + totalMissed);

  return (
    <div>
      <p>Total Shots: {statTotal}</p>
      <p>Total Sessions: {numberOfSessions}</p>
      <hr />
      {rows}
    </div>
  );
}

function StatTracker({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="app-header-item">
        <Button variant="warning" onClick={handleShow}>
          <i className="bi bi-bar-chart-steps"></i>
        </Button>
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Stats</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <StatData />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default StatTracker;
