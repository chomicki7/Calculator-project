const numbers = document.querySelectorAll(".darkGrey-color");
const equal = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");
const doneMath = document.querySelector(".current-calculation");
const plusBtn = document.querySelector(".plus-btn");
const minusBtn = document.querySelector(".minus-btn");
const splitBtn = document.querySelector(".split-btn");
const timesBtn = document.querySelector(".times-btn");
const dotBtn = document.querySelector(".dot-btn");

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

dotBtn.addEventListener("click", function () {
  //check there is not a decimal already nor a result is being shown
  if (!decimal && operator != "=") {
    result.textContent = result.textContent + ".";
    decimal = true;
  } else {
    return;
  }
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
    //numbers pressed shown as strings to add it at the end. Check that a result is not being shown
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

minusBtn.addEventListener("click", function () {
  let value = parseFloat(result.textContent);
  // check that limit was not reached nor an operation was just resolved so ceros wont stack
  if (limit || operator == "-") {
    return;
  }
  //finalValue == 0, first number input
  if (!finalValue) {
    doneMath.textContent = result.textContent + "-";
    finalValue = value;
    result.textContent = 0;
    calculatorWidth.textContent = "";
    // not the first input, and no operations been made yet
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "-";
    finalValue -= value;
    result.textContent = 0;
    // a result of an operation is being shown and we operate with that value
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "-";
    result.textContent = 0;
  }
  operator = "-";
  calculatorWidth.textContent = result.textContent;
});

plusBtn.addEventListener("click", function () {
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
  //finalValue == 0, first number input
  if (!finalValue) {
    doneMath.textContent = result.textContent + "+";
    finalValue = value;
    result.textContent = 0;
    calculatorWidth.textContent = "";
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "+";
    finalValue += value;
    result.textContent = 0;
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "+";
    result.textContent = 0;
  }
  operator = "+";
  calculatorWidth.textContent = result.textContent;
});

timesBtn.addEventListener("click", function () {
  let value = parseFloat(result.textContent);
  // check that limit was not reached
  if (limit) {
    return;
  }
  //no operate with just cero
  if (result.textContent == 0 && operator != "=") {
    return;
  }
  //finalValue == 0, first number input
  if (!finalValue) {
    doneMath.textContent = result.textContent + "x";
    finalValue = value;
    result.textContent = 0;
    calculatorWidth.textContent = "";
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "x";
    finalValue *= value;
    result.textContent = 0;
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "*";
    result.textContent = 0;
  }
  operator = "*";
  calculatorWidth.textContent = result.textContent;
});

splitBtn.addEventListener("click", function () {
  let value = parseFloat(result.textContent);
  // check that limit was not reached
  if (limit) {
    return;
  }
  //no operate with just cero
  if (result.textContent == 0 && operator != "=") {
    return;
  }
  //finalValue == 0, first number input
  if (!finalValue) {
    doneMath.textContent = result.textContent + "/";
    finalValue = value;
    result.textContent = 0;
    calculatorWidth.textContent = "";
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "/";
    finalValue /= value;
    result.textContent = 0;
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "/";
    result.textContent = 0;
  }
  operator = "/";
  calculatorWidth.textContent = result.textContent;
});

equal.addEventListener("click", function () {
  let value = parseFloat(result.textContent);
  if (result.textContent == 0) {
    result.textContent = finalValue;
    operator = "=";
    calculatorWidth.textContent = result.textContent;
    return;
  } else if (operator == "+") {
    finalValue += value;
  } else if (operator == "/") {
    finalValue /= value;
  } else if (operator == "-") {
    finalValue -= value;
  } else if (operator == "*") {
    finalValue *= value;
  } else if (finalValue == 0 && doneMath.textContent == "") {
    return;
  }
  if (Number.isInteger(finalValue)) {
    result.textContent = finalValue;
  } else {
    result.textContent = finalValue.toFixed(4);
    decimal = true;
  }
  doneMath.textContent += result.textContent;
  operator = "=";
  calculatorWidth.textContent = result.textContent;
  decimal = false;
});

// if calculator reaches digits limit shows alert
const limitReached = (text) => {
  result.textContent = rangeText;
  limit = true;
  setTimeout(() => {
    result.textContent = text;
    limit = false;
  }, 500);
};

