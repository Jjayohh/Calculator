class Calculator {
  constructor(prevOperandTextElement, currentOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  addNumber(number) {
    if (number == "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  addplusMinus(number) {
    this.currentOperand = this.currentOperand.toString().unshift("-");
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computate;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computate = prev + current;
        break;
      case "-":
        computate = prev - current;
        break;
      case "/":
        computate = prev / current;
        break;
      case "x":
        computate = prev * current;
        break;
      default:
        return;
    }
    this.currentOperand = computate;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  displayUpdate() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const clearAllButton = document.querySelector("#clearAll");
const deleteButton = document.querySelector("#delete");
const equalsButton = document.querySelector("#equals");
const plusMinusButton = document.querySelector("#plusMinus");
const prevOperandTextElement = document.querySelector(".prev-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

const calculator = new Calculator(
  prevOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.addNumber(button.innerText);
    calculator.displayUpdate();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.displayUpdate();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.displayUpdate();
});

clearAllButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.displayUpdate();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.displayUpdate();
});

plusMinusButton.addEventListener("click", (button) => {
  calculator.addplusMinus();
  calculator.displayUpdate();
});
