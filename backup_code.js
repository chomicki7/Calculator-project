/* 
minusBtn.addEventListener("click", function () {
  let value = parseFloat(result.textContent);
  decimal = false;
  // check that limit was not reached nor an operation was just resolved so ceros wont stack
  if (limit) {
    return;
  }
  if (result.textContent == 0 && operator != "=") {
    return;
  }
  //finalValue == 0, first number input
  if (!finalValue && !operator) {
    doneMath.textContent = result.textContent + "-";
    finalValue = value;
    calculatorWidth.textContent = "";
    // not the first input, and no operations been made yet
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "-";
    operateLastInput(value);
    // a result of an operation is being shown and we operate with that value
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "-";
  }
  result.textContent = 0;
  operator = "-";
  calculatorWidth.textContent = result.textContent;
});

plusBtn.addEventListener("click", function () {
  console.log(typeof plusBtn.dataset.value);
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
  if (!finalValue && !operator) {
    doneMath.textContent = result.textContent + "+";
    finalValue = value;
    calculatorWidth.textContent = "";
    // not the first input, and no operations been made yet
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "+";
    operateLastInput(value);
    // a result of an operation is being shown and we operate with that value
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "+";
  }
  result.textContent = 0;
  operator = "+";
  calculatorWidth.textContent = result.textContent;
});

timesBtn.addEventListener("click", function () {
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
  if (!finalValue && !operator) {
    doneMath.textContent = result.textContent + "x";
    finalValue = value;
    calculatorWidth.textContent = "";
    // not the first input, and no operations been made yet
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "x";
    operateLastInput(value);
    // a result of an operation is being shown and we operate with that value
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "*";
  }
  result.textContent = 0;
  operator = "*";
  calculatorWidth.textContent = result.textContent;
});

splitBtn.addEventListener("click", function () {
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
  if (!finalValue && operator == "") {
    doneMath.textContent = result.textContent + "/";
    finalValue = value;
    calculatorWidth.textContent = "";
  } else if (operator != "=") {
    doneMath.textContent += result.textContent + "/";
    operateLastInput(value);
  } else {
    finalValue = value;
    doneMath.textContent = finalValue + "/";
  }
  result.textContent = 0;
  operator = "/";
  calculatorWidth.textContent = result.textContent;
});
 */