/* Issues: measuring the calculator display width, using grid,
 */

const numbers = document.querySelectorAll(".darkGrey-color");
const equal = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");
const doneMath = document.querySelector(".current-calculation");
const plusBtn = document.querySelector(".plus-btn");
const minusBtn = document.querySelector(".minus-btn");
const splitBtn = document.querySelector(".split-btn");
const timesBtn = document.querySelector(".times-btn");
const rangeText = "Limit reached";

/* hidden div created to measure the pixels the numbers are occupying and avoid overflowing
 on the calculator display */
const calculatorWidth = document.querySelector(".measuringDiv");

// results variable and another one to save the second number to operate with
let finalValue = 0;
let firstNum = 0;
let operator;

clearBtn.addEventListener("click", function () {
  result.textContent = 0;
  doneMath.textContent = "";
  calculatorWidth.textContent = "";
  finalValue = 0;
});

numbers.forEach((item) => {
  item.addEventListener("click", function () {
    console.log("number", finalValue);
    // check for the length of the num to display
    if (calculatorWidth.clientWidth > 310) {
      limitReached(result.textContent);
      return;
    }
    //check that limit reached text is not shown
    if (result.textContent == rangeText) {
      return;
    }
    if (result.textContent == 0) {
      // number cant start with ceros
      result.textContent = "";
    }
    //display of every number pressed as string
    result.textContent += item.dataset.value;

    //adds items to the div that later we use to check the width of the calculator display
    calculatorWidth.textContent += parseInt(item.dataset.value);
  });
});

minusBtn.addEventListener("click", function () {
  //no operate with just cero
  if (result.textContent == 0) {
    return;
  }
  //final value == 0
  if (!finalValue) {
    doneMath.textContent = result.textContent + "-";
    finalValue = parseInt(result.textContent);
    result.textContent = 0;
    calculatorWidth.textContent = "";
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "-";
    finalValue -= parseInt(result.textContent);
    result.textContent = 0;
  } else {
    finalValue = parseInt(result.textContent);
    doneMath.textContent = finalValue + "-";
    result.textContent = 0;
  }
  operator = "-";
});

plusBtn.addEventListener("click", function () {
  let value = parseInt(result.textContent);
  //no operate with just cero
  if (result.textContent == 0) {
    return;
  }
  //final value == 0, toma el valor de pantalla
  if (!finalValue) {
    doneMath.textContent = result.textContent + "+";
    finalValue = value;
    result.textContent = 0;
    calculatorWidth.textContent = "";
    // ya hay valores ingresados
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "+";
    finalValue += value;
    result.textContent = 0;
  } else {
    finalValue = parseInt(result.textContent);
    doneMath.textContent = finalValue + "+";
    result.textContent = 0;
  }
  operator = "+";
});

timesBtn.addEventListener("click", function () {
  //no operate with just cero
  if (result.textContent == 0) {
    return;
  }
  //final value == 0
  if (!finalValue) {
    doneMath.textContent = result.textContent + "x";
    finalValue = parseInt(result.textContent);
    result.textContent = 0;
    calculatorWidth.textContent = "";
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "x";
    finalValue *= parseInt(result.textContent);
    result.textContent = 0;
  } else {
    finalValue = parseInt(result.textContent);
    doneMath.textContent = finalValue + "*";
    result.textContent = 0;
  }
  operator = "*";
});

splitBtn.addEventListener("click", function () {
  //no operate with just cero
  if (result.textContent == 0) {
    return;
  }
  //final value == 0
  if (!finalValue) {
    doneMath.textContent = result.textContent + "/";
    finalValue = parseInt(result.textContent);
    result.textContent = 0;
    calculatorWidth.textContent = "";
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "/";
    finalValue /= parseInt(result.textContent);
    result.textContent = 0;
  } else {
    finalValue = parseInt(result.textContent);
    doneMath.textContent = finalValue + "/";
    result.textContent = 0;
  }
  operator = "/";
});

equal.addEventListener("click", function () {
  if (result.textContent == 0) {
    result.textContent = finalValue;
  } else if (operator == "+") {
    doneMath.textContent += result.textContent;
    finalValue += parseInt(result.textContent);
    result.textContent = finalValue;
  } else if (operator == "/") {
    doneMath.textContent += result.textContent;
    finalValue /= parseInt(result.textContent);
    result.textContent = finalValue;
  } else if (operator == "-") {
    doneMath.textContent += result.textContent;
    finalValue -= parseInt(result.textContent);
    result.textContent = finalValue;
  } else if (operator == "*") {
    doneMath.textContent += result.textContent;
    finalValue *= parseInt(result.textContent);
    result.textContent = finalValue;
  }
  operator = "=";
});

const equalCheck = () => {
  if (operator == "=") {
    console.log("IN");
    doneMath.textContent = "";
    finalValue = result.textContent;
  }
};

// if calculator reaches digits limit shows alert
const limitReached = (text) => {
  // check that the alert is not shown already
  if (result.textContent !== rangeText) {
    result.textContent = rangeText;
  }
  setTimeout(() => {
    result.textContent = text;
  }, 500);
};
