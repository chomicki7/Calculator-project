const numbers = document.querySelectorAll(".darkGrey-color");
const equal = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");
const currentCalculation = document.querySelector(".current-calculation");
const plusBtn = document.querySelector(".plus-btn");
const minusBtn = document.querySelector(".minus-btn");
const splitBtn = document.querySelector(".split-btn");
const timesBtn = document.querySelector(".times-btn");

//hidden div created to measure the pixels the numbers are occupying and avoid overflowing 
// on the calculator display 
const calculatorWidth = document.querySelector(".measuringDiv");

// variables to save the numbers the user will operate with
let firstNumber = 0;
let secondNumber = 0;

clearBtn.addEventListener("click", function () {
  result.textContent = 0;
  currentCalculation.textContent = "";
  calculatorWidth.textContent = "";
});

numbers.forEach((item) => {
  item.addEventListener("click", function () {
    if (calculatorWidth.clientWidth > 310) {
      limitReached(result.textContent);
      return;
    }
    if (result.textContent == 0) {
      result.textContent = "";
    }
    result.textContent += parseInt(item.dataset.value);
    calculatorWidth.textContent += parseInt(item.dataset.value);
  });
});

plusBtn.addEventListener("click", function () {});

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
