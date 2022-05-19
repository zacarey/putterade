import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

export default ChooseCircle;

function ChooseCircle(props) {
  const [radioValue, setRadioValue] = useState("c1");

  const radios = [
    { name: "C1", value: "c1" },
    { name: "C2", value: "c2" },
    { name: "Both", value: "both" },
  ];

  return (
    <div className="choose-circle-container">
      <ButtonGroup onChange={props.onChange}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={
              idx === 0
                ? "outline-success"
                : idx === 1
                ? "outline-primary"
                : "outline-info"
            }
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}
