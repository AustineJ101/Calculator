const calculator = {
    add(a, b){ return a + b},
    subtract(a, b){return a - b},
    multiply(a, b){return a * b},
    divide(a, b){return a / b},
}

function operate(operand1, op, operand2){
    let result;
    switch(op){
        case "+":
            result = calculator.add(operand1, operand2)
            break;
        case "-":
            result = calculator.subtract(operand1, operand2)
            break;
        case "*":
            result = calculator.multiply(operand1, operand2)
            break;
        case "/":
            result = calculator.divide(operand1, operand2)
    }

    return result;
}

console.log(operate(5, "/", 6))