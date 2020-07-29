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

/* hidden div created to measure the pixels the numbers are occupying and avoid overflowing
 on the calculator display */
const calculatorWidth = document.querySelector(".measuringDiv");

// results variable and another one to save the second number to operate with
let finalValue = 0;
let firstNum = 0;
let secondNum = 0;

clearBtn.addEventListener("click", function () {
  result.textContent = 0;
  doneMath.textContent = "";
  calculatorWidth.textContent = "";
  finalValue = 0;
  secondNum = 0;
});

numbers.forEach((item) => {
  item.addEventListener("click", function () {
    // check for the length of the num to display
    if (calculatorWidth.clientWidth > 310) {
      limitReached(result.textContent);
      return;
    }
    // number cant start with ceros
    if (result.textContent == 0) {
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
  } else {
    doneMath.textContent += result.textContent + "-";
    finalValue -= parseInt(result.textContent);
    result.textContent = 0;
  }
});

plusBtn.addEventListener("click", function () {
  //no operate with just cero
  if (result.textContent == 0) {
    return;
  }
  //final value == 0
  if (!finalValue) {
    doneMath.textContent = result.textContent + "+";
    finalValue = parseInt(result.textContent);
    result.textContent = 0;
    calculatorWidth.textContent = "";
  } else {
    doneMath.textContent += result.textContent + "+";
    finalValue += parseInt(result.textContent);
    result.textContent = 0;
    console.log(finalValue);
  }
});

const operation = () => {};

equal.addEventListener("click", function () {
  result.textContent = finalValue;
});

// if calculator reaches digits limit shows alert
const limitReached = (text) => {
  // check that the alert is not shown already
  if (result.textContent !== "limit reached") {
    result.textContent = "limit reached";
  }
  setTimeout(() => {
    result.textContent = text;
  }, 500);
};
