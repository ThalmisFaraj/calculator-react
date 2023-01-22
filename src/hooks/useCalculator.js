import { useState } from "react";

const useCalculator = () => {
  const [enteredNum, setEnteredNum] = useState("");
  const [enteredNumArray, setEnteredNumArray] = useState([]);

  const handleNumberClick = (num) => {
    setEnteredNum((prev) => {
      return prev * 10 + num;
    });
  };
  const handleCalculation = () => {
    setEnteredNumArray((prev) => {
      return [...prev, enteredNum];
    });
  };

  return { enteredNum, handleNumberClick, handleCalculation, enteredNumArray };
};

export default useCalculator;

const arrNum = [59, 56, 30, 2, 108, 18];
const opArr = ["-", "-", "x", "+", "/"];

// const handleCalculation = (arrNum, opArr) => {
//   let i, j;
//   let sum = arrNum[0];

//   for (i = 1, j = 0; i < arrNum.length, j < opArr.length; i++, j++) {
//     console.log(sum);
//     sum = accumulatorFunc(sum, arrNum[i], opArr[j]);
//   }
//   return sum;
// };

// function accumulatorFunc(num1, num2, opr) {
//   switch (opr) {
//     case "+":
//       return num1 + num2;
//     case "-":
//       return num1 - num2;
//     case "x":
//       return num1 * num2;
//     case "/":
//       return num1 / num2;

//     default:
//       return;
//   }
// }

const total = handleCalculation(arrNum, opArr);
console.log(total);
