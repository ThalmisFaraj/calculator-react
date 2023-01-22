import { useReducer } from "react";
import "./App.css";
import DigitButton from "./components/DigitButton";
import OperatorButton from "./components/OperatorButton";

export const ACTIONS = {
  CLEAR: "clear",
  EVALUATE: "evaluate",
  DELETE: "delete",
  ENTER_DIGIT: "enter-digit",
  ENTER_OPERATOR: "enter-operator",
};

const evaluate = (operator, current, previous) => {
  let result = 0;
  let prev = parseFloat(previous);
  let curr = parseFloat(current);
  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;

    default:
      break;
  }
  return result;
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ENTER_DIGIT:
      //if an expression is evalauted adn result obtained, then any further
      //number clicks should start a new evaluation cycle
      if (payload === "0" && state.currentOperand === "0") return { ...state };
      if (payload === "." && state.currentOperand.includes("."))
        return { ...state };
      if (state.isEvaluated && !state.prevOperand)
        return {
          ...state,
          currentOperand: payload,
          prevOperand: "",
          operator: "",
          isEvaluated: false,
        };

      if (!state.prevOperand) {
        return {
          ...state,
          currentOperand: `${state.currentOperand}${payload}`,
        };
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand}${payload}`,
      };

    //============================================================
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "",
        prevOperand: "",
        operator: "",
      };

    //============================================================
    case ACTIONS.ENTER_OPERATOR:
      if (!state.currentOperand) return { ...state }; //to return nothing when operators are pressed b4 entering digits
      if (!state.prevOperand)
        return {
          ...state,
          operator: payload,
          prevOperand: state.currentOperand,
          currentOperand: "",
        };

      return {
        ...state,
        prevOperand: evaluate(
          state.operator,
          state.currentOperand,
          state.prevOperand
        ),
        currentOperand: "",
        operator: payload,
      };
    //============================Evaluation when = is pressed================================
    case ACTIONS.EVALUATE:
      //to return the same number when only 1 operand is received and then
      //= is pressed
      if (state.prevOperand && state.operator && !state.currentOperand)
        return {
          ...state,
          currentOperand: state.prevOperand,
          prevOperand: "",
          operator: "",
        };
      if (!state.currentOperand || !state.prevOperand) return { ...state };
      //to return nothing when operators are pressed b4 entering digits
      return {
        ...state,
        currentOperand: evaluate(
          payload.operator,
          payload.currentOperand,
          payload.prevOperand
        ),
        prevOperand: "",
        operator: "",
        isEvaluated: true, // check here
      };

    case ACTIONS.DELETE:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    default:
    // code block
  }
};

const initialState = {
  currentOperand: "",
  prevOperand: "",
  operator: "",
  isEvaluated: false, //to check if = is pressed before entering any number
};

function NewApp() {
  const [{ currentOperand, prevOperand, operator }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="app">
      {/* <header>
        <h1>Calculator</h1>
      </header> */}
      <div className="console">
        <span>{`${prevOperand} ${operator}`}</span>
        <span>{currentOperand}</span>
      </div>
      <div className="number-console">
        <div className="row-one">
          <DigitButton dispatch={dispatch} digit="7" />
          <DigitButton dispatch={dispatch} digit="8" />
          <DigitButton dispatch={dispatch} digit="9" />

          <OperatorButton
            dispatch={() =>
              dispatch({
                type: ACTIONS.EVALUATE,
                payload: { currentOperand, prevOperand, operator },
              })
            }
            operator="="
          />
        </div>
        <div className="row-two">
          <DigitButton dispatch={dispatch} digit="4" />
          <DigitButton dispatch={dispatch} digit="5" />
          <DigitButton dispatch={dispatch} digit="6" />
          <OperatorButton dispatch={dispatch} operator="/" />
        </div>
        <div className="row-three">
          <DigitButton dispatch={dispatch} digit="1" />
          <DigitButton dispatch={dispatch} digit="2" />
          <DigitButton dispatch={dispatch} digit="3" />
          <OperatorButton dispatch={dispatch} operator="x" />
        </div>
        <div className="row-four">
          <DigitButton dispatch={dispatch} digit="." />
          <DigitButton dispatch={dispatch} digit="0" />

          <OperatorButton dispatch={dispatch} operator="-" />
          <OperatorButton dispatch={dispatch} operator="+" />
        </div>
        <div className="row-five">
          <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>CE</button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>
            DEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewApp;
