import React from "react";
import { ACTIONS } from "../NewApp";
function OperatorButton({ operator, dispatch }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.ENTER_OPERATOR, payload: operator });
      }}
    >
      {operator}
    </button>
  );
}

export default OperatorButton;
