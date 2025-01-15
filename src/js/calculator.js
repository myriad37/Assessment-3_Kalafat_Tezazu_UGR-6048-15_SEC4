// Select elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

// Initialize variables
let currentInput = "";
let previousInput = "";
let operator = null;

// Function to update the display
function updateDisplay(value) {
  display.value = value;
}

// Function to handle button clicks
function handleButtonClick(value) {
  if (!isNaN(value)) { // If the button is a number
    currentInput += value;
    updateDisplay(currentInput);
  } else if (value === ".") { // Handle decimal point
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay(currentInput);
    }
  } else if (["+", "-", "*", "/"].includes(value)) { // If the button is an operator
    if (currentInput !== "") {
      if (previousInput !== "" && operator) {
        calculate();
      } else {
        previousInput = currentInput;
      }
      operator = value;
      currentInput = "";
    }
  }
}

// Function to calculate the result
function calculate() {
  if (previousInput !== "" && currentInput !== "" && operator) {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    let result;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        return;
    }

    updateDisplay(result);
    previousInput = result.toString();
    currentInput = "";
    operator = null;
  }
}

// Event listeners for buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    handleButtonClick(value);
  });
});

// Event listener for the equals button
equalsButton.addEventListener("click", calculate);

// Event listener for the clear button
clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("");
});

  