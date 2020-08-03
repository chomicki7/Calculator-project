const numbers = document.querySelectorAll(".darkGrey-color");
const equal = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");
const doneMath = document.querySelector(".current-calculation");
const dotBtn = document.querySelector(".dot-btn");
const operations = document.querySelectorAll(".grey-color");

/* hidden div created to measure the pixels the numbers are occupying and avoid overflowing
 on the calculator display */
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
    //numbers pressed shown as strings. Check that a result is not being shown
    if (operator == "=") {
      finalValue = 0;
      result.textContent = item.dataset.value;
      doneMath.textContent = "";
      operator = "";
    } else {
      result.textContent += item.dataset.value;
    }
    //adds items to the div we use to check the width of the calculator display
    calculatorWidth.textContent += item.dataset.value;
  });
});

operations.forEach((item) => {
  item.addEventListener("click", function () {
    // save the inputted number
    let value = parseFloat(result.textContent);
    decimal = false;
    // check that limit was not reached
    if (limit) {
      return;
    }
    //no operate with just cero
    if (result.textContent == 0 && operator != "=") {
      return;
    }
    operating(value, item.dataset.value);
  });
});

const operating = (value, currentOperation) => {
  //finalValue == 0, first number input
  if (!finalValue && !operator) {
    doneMath.textContent = result.textContent + currentOperation;
    finalValue = value;
    calculatorWidth.textContent = "";
    // not the first input, and no operations been made yet
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + currentOperation;
    operateLastInput(value);
    // a result of an operation is being shown and we operate with that value
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + currentOperation;
  }
  result.textContent = 0;
  operator = currentOperation;
  calculatorWidth.textContent = result.textContent;
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
  operateLastInput(value);
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

// if calculator reaches digits limit shows alert
const limitReached = (text) => {
  result.textContent = rangeText;
  limit = true;
  setTimeout(() => {
    result.textContent = text;
    limit = false;
  }, 500);
};
