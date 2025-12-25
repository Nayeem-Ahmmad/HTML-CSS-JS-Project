

let currentValue = "0";
let previousValue = null;
let operator = null;

const display = document.getElementById("display");

// 🔹 Display update
function updateDisplay() {
  display.innerText = currentValue;
}

// 🔹 Number input
function appendNumber(number) {

  if (number === "." && currentValue.includes(".")) return;

  if( currentValue === "0" && number !== ".") {
    currentValue = number;
  } else {
    currentValue += number;
  }
  updateDisplay();
}

// 🔹 Operator select
function chooseOperator(op) {

  if( operator !== null) calculate();

  previousValue = currentValue;
  operator = op;
  currentValue = "0";

}

// 🔹 Calculate result
function calculate() {

  if( operator === null) return;
  let result;

  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr === 0 ? "Error" : prev / curr;
      break;
    case "%":
        result = curr === 0 ? "Error" : prev % curr;
  }

  currentValue = result.toString();
  
  operator = null;
  previousValue = null;
  updateDisplay();
  
}


// 🔴 AC → সব clear
function allClear() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  updateDisplay();
}

// 🔵 DEL → last digit delete
function deleteLast() {
  if (currentValue.length === 1) {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}
