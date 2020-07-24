const numbers = document.querySelectorAll(".darkgrey-color");
const equal = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
const clearBtn = document.querySelector(".clear-btn");
const currentCalculation = document.querySelector(".current-calculation");
const plusBtn = document.querySelector(".plus-btn");
const minusBtn = document.querySelector(".minus-btn");
const splitBtn = document.querySelector(".split-btn");
const timesBtn = document.querySelector(".times-btn");

//calculator has 20 spaces

let sum = 0;

clearBtn.addEventListener("click", function () {
  result.textContent = 0;
  currentCalculation.textContent = "";
});

numbers.forEach((item) => {
  item.addEventListener("click", function () {
    if (result.textContent.length == 19) {
      limitReached(result.textContent);
      return;
    }
    if (result.textContent == 0) {
      result.textContent = "";
    }
    result.textContent += parseInt(item.dataset.value);
  });
});

// if calculator reaches digits limit show alert
const limitReached = (text) => {
  result.textContent = "limit reached";
  setTimeout(() => {
    result.textContent = text;
  }, 800);
};
