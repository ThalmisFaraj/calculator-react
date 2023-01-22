import { useState } from "react";
import "./App.css";

function App() {
  const [enteredNum, setEnteredNum] = useState("");
  const [enteredNumArray, setEnteredNumArray] = useState([]);
  const [operationsArray, setOperationsArray] = useState([]);
  const [counterHistory, setCounterHistory] = useState("");
  const [total, setTotal] = useState(0);

  const handleNumberClick = (num) => {
    setEnteredNum(() => {
      return enteredNum * 10 + +num;
    });
  };

  const handleOperation = (newOperator) => {
    console.log(`new operator is${newOperator}`);
    setEnteredNumArray((prev) => {
      if (enteredNum) return [...prev, enteredNum];
      else return [...prev];
    });
    setCounterHistory((prev) => {
      return prev + enteredNum;
    });
    setEnteredNum("");
    setCounterHistory((prev) => {
      return prev + newOperator;
    });
    setOperationsArray((prev) => {
      return [...prev, newOperator];
    });
    if (newOperator === "=") {
      handleCalculation(enteredNumArray, operationsArray);
    }
  };

  const handleCalculation = (arrNum, opArr) => {
    let i, j;
    let sum = arrNum[0];

    for (i = 1, j = 0; i <= arrNum.length && j < opArr.length; i++, j++) {
      console.log(sum);
      sum = accumulatorFunc(sum, arrNum[i], opArr[j]);
    }
    console.log(sum);
  };

  function accumulatorFunc(num1, num2, opr) {
    console.log(num1);
    switch (opr) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "x":
        return num1 * num2;
      case "/":
        return num1 / num2;

      default:
        return;
    }
  }

  const handleClick = (e) => {
    const clickedButtonValue = e.target.innerText;
    console.log(clickedButtonValue);

    if (clickedButtonValue < 10 || clickedButtonValue >= 0) {
      handleNumberClick(clickedButtonValue);
    } else if (clickedButtonValue === "CE") {
      setEnteredNum(0);
    } else {
      handleOperation(clickedButtonValue);
    }
  };
  // } else if (clickedButtonValue === "=") {
  //   handleCalculation(enteredNumArray, operationsArray);
  console.log(enteredNumArray);
  console.log(operationsArray);
  return (
    <div className="app">
      <div className="console">
        <span>{counterHistory}</span>
        <span>{enteredNum}</span>
        <span>{total}</span>
      </div>
      <div className="number-console">
        <div className="row-one">
          <button onClick={handleClick}>7</button>
          <button onClick={handleClick}>8</button>
          <button onClick={handleClick}>9</button>
          <button onClick={handleClick}>=</button>
        </div>
        <div className="row-two">
          <button onClick={handleClick}>4</button>
          <button onClick={handleClick}>5</button>
          <button onClick={handleClick}>6</button>
          <button onClick={handleClick}>/</button>
        </div>
        <div className="row-three">
          <button onClick={handleClick}>1</button>
          <button onClick={handleClick}>2</button>
          <button onClick={handleClick}>3</button>
          <button onClick={handleClick}>x</button>
        </div>
        <div className="row-four">
          <button onClick={handleClick}>0</button>
          <button onClick={handleClick}>CE</button>
          <button onClick={handleClick}>-</button>
          <button onClick={handleClick}>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
