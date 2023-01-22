import React from "react";
import "./DigitButton.css";
import { ACTIONS } from "../NewApp";

function DigitButton({ digit, dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.ENTER_DIGIT, payload: digit });
      }}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
