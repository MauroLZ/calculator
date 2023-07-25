let firstNumber = '';
let secondNumber = '';
let operator;
let equation = '';

// Creating a variable that will hold the screen text element
const screenText = document.getElementById('screen-text');

// Creating a variable that will hold the number buttons
const numberButtons = document.querySelectorAll('.number button');

// Creating a function that will handle the number input
function handleNumberInput(numberClicked) {
    const numberToInt = parseFloat(numberClicked);
    // If there is no operator, add the number to the first number
    if (!operator) {
        firstNumber += numberToInt;
        equation += numberClicked;
        screenText.textContent = equation;
        // If there is an operator, add the number to the second number
    } else {
        secondNumber += numberToInt;
        equation += numberClicked;
        screenText.textContent = equation;
    }
}

// Adding an event listener to each number button that will call the handleNumberInput function
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const numberClicked = button.textContent;
        handleNumberInput(numberClicked);
    });
});

// Creating a variable that will hold the operator buttons
const operatorButtons = document.querySelectorAll('.operator');

// Adding an event listener to each operator button that will call the handleOperatorInput function
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operatorClicked = button.textContent;

        // If the operator clicked is '=', calculate the result
        if (operatorClicked === '=') {
            if (operator && firstNumber && secondNumber) {
                const result = calculateResult();

                // Create a variable that will hold the equation, so it can be printed as a whole on the screen
                equation = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
                screenText.textContent = equation;
                // Reset the variables. First number will be now the result of the calculation
                firstNumber = result;
                secondNumber = '';
                operator = undefined;
            }

            // If the operator clicked is not '=', but first number is not empty and second number is not empty
            // Calculate the result and set the operator to the one clicked, printing the result plus the new operator
        } else if (operatorClicked !== '=' && firstNumber !== '' && secondNumber !== '') {
            const result = calculateResult();
            equation = `${result} ${operatorClicked} `;
            screenText.textContent = equation;
            // Now first number holds the result and second number is empty
            firstNumber = result;
            secondNumber = '';
            operator = operatorClicked;

            // If the operator clicked is not '=', but first number is not empty and second number is empty
            // Set the operator to the one clicked, printing the first number plus the new operator
        } else if (operatorClicked !== '=' && firstNumber !== '' && secondNumber === '') {
            operator = operatorClicked;
            equation += ` ${operator} `;
            screenText.textContent = equation;
        }
    });
});

function calculateResult() {
    // Convert the numbers from string to float
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    // Calculate the result based on the operator
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '%':
            return num1 / num2;
        default:
            return NaN;
    }
}

// Creating a variable that will hold the clear button
const clearButton = document.querySelector('.clear button');

// Adding an event listener to the clear button that will reset the variables and clear the screen
clearButton.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = undefined;
    screenText.textContent = '';
});

// Creating a variable that will hold the delete button
const deleteButton = document.querySelector('.delete button');

// Adding an event listener to the delete button that will delete the last number
deleteButton.addEventListener('click', () => {
    if (operator && secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
        screenText.textContent = secondNumber;
    } else if (firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
        screenText.textContent = firstNumber;
    }
});
