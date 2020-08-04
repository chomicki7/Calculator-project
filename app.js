const numbers = document.querySelectorAll(".darkGrey-color");
const equal = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");
const doneMath = document.querySelector(".current-calculation");
const dotBtn = document.querySelector(".dot-btn");
const operations = document.querySelectorAll(".grey-color");

/* hidden div created to measure the pixels the numbers are occupying and avoid overflowing
 on the calculator main display */
const calculatorWidth = document.querySelector(".measuringDiv");

const rangeText = "Limit reached";
let finalValue = 0;
let limit = false;
let decimal = false;
let operator;

clearBtn.addEventListener("click", function () {
  result.textContent = 0;
  doneMath.textContent = "";
  calculatorWidth.textContent = "";
  finalValue = 0;
  decimal = false;
  operator = "";
});

numbers.forEach((item) => {
  item.addEventListener("click", function () {
    //check that limit was not reached and the alert is not being shown
    if (limit) {
      return;
    }
    // check for the length of the num to display comparing it with the hidden div
    if (calculatorWidth.clientWidth > 300) {
      limitReached(result.textContent);
      return;
    }
    //number cant start with cero unless a decimal is being created
    if (result.textContent == 0 && !decimal) {
      result.textContent = "";
    }
    //numbers pressed added as strings, checks that a result is not being shown
    if (operator == "=") {
      finalValue = 0;
      result.textContent = item.dataset.value;
      doneMath.textContent = "";
      operator = "";
    } else {
      result.textContent += item.dataset.value;
    }
    //adds items to the div to check the width of the calculator display
    calculatorWidth.textContent += item.dataset.value;
  });
});


operations.forEach((item) => {
  item.addEventListener("click", function () {
    // save the inputted parsing it to a float considering decimals
    let value = parseFloat(result.textContent);
    decimal = false;
    // check that limit was not reached
    if (limit) {
      return;
    }
    //cant operate with just cero
    if (result.textContent == 0 && operator != "=") {
      return;
    }
    operating(value, item.dataset.value);
  });
});

// takes the value inputted and the operation selected to modify the global finalValue(the result) variable
const operating = (value, currentOperation) => {
  //finalValue == 0, first number input case
  if (!finalValue && !operator) {
    doneMath.textContent = result.textContent + currentOperation;
    finalValue = value;
    calculatorWidth.textContent = "";
    // not the first input, operate with the number saved and the
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + currentOperation;
    operateLastInput(value);
    // a result of an operation is being shown and must operate with that value
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + currentOperation;
  }
  result.textContent = 0;
  //global variable to keep track of the last operation selected if any
  operator = currentOperation;
  calculatorWidth.textContent = result.textContent;
};

// modifies finalValue (the global var holding the result) with the new input and operation selected
const operateLastInput = (value) => {
  if (operator == "+") {
    finalValue += value;
  } else if (operator == "/") {
    finalValue /= value;
  } else if (operator == "-") {
    finalValue -= value;
  } else if (operator == "*") {
    finalValue *= value;
  }
};

dotBtn.addEventListener("click", function () {
  //check there is not a decimal already nor a result is being shown
  if (!decimal && operator != "=") {
    result.textContent = result.textContent + ".";
    decimal = true;
  } else {
    return;
  }
});

equal.addEventListener("click", function () {
  let value = parseFloat(result.textContent);
  // return if equal is pressed many times
  if ((finalValue == 0 && doneMath.textContent == "") || operator == "=") {
    return;
  }
  doneMath.textContent += result.textContent;
  // 0 in the result display
  if (!value) {
    result.textContent = finalValue;
    operator = "=";
    calculatorWidth.textContent = result.textContent;
    return;
  } 
  // process the last operation selected
  operateLastInput(value);
  //if result is integer, don't show decimals
  if (Number.isInteger(finalValue)) {
    result.textContent = finalValue;
  } else {
    result.textContent = finalValue.toFixed(4);
    decimal = true;
  }
  operator = "=";
  calculatorWidth.textContent = result.textContent;
  decimal = false;
});

// if calculator reaches digits limit on main display shows alert
const limitReached = (text) => {
  result.textContent = rangeText;
  limit = true;
  setTimeout(() => {
    result.textContent = text;
    limit = false;
  }, 500);
};
