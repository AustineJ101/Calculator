const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const commands = document.querySelectorAll(".command")
const expression = document.querySelector(".expression");
const result = document.querySelector(".result");

const operand1 = [];
const operator = [];
const operand2 = [];
let answer = "";

numbers.forEach(btn => {
    btn.addEventListener("click", (e)=> {
        let value = e.target.textContent;
        handleNumber(value);
    })
})

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        let op = e.target.textContent;
        handleOperator(op);
    })
})

commands.forEach(command => {
    command.addEventListener("click", handleCommand)
})

const calculator = {
    add(a, b){ return a + b},
    subtract(a, b){return a - b},
    multiply(a, b){return a * b},
    divide(a, b){return a / b},
    remainder(a, b){return a % b},
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
        case "x":
            result = calculator.multiply(operand1, operand2)
            break;
        case "/":
            result = calculator.divide(operand1, operand2)
            break;
        case "%":
            result = calculator.remainder(operand1, operand2)
    }

    return result;
}

function handleNumber(value){
    if(operator.length == 0){
        if(value == "."){ 
            if(!operandHasPoint(operand1)){
                 if(operand1.length == 0){
                    operand1.push("0");
                    operand1.push(value);
                }else{
                    operand1.push(value)
                }
            }
           
            

        }else if(value == "0"){
            if(!(operand1.length == 1 && operand1[0] == "0")){
                operand1.push(value)
            }
            
        }else{
            if(operand1.length == 1 && operand1[0] == "0"){
                operand1[0] = value;
            }else{
                operand1.push(value);
            }
            
        }
        
    }else{
        if(value == "."){
            if(!operandHasPoint(operand2)){
                 if(operand2.length == 0){
                    operand2.push("0");
                    operand2.push(value);
                }else{
                    operand2.push(value)
                }
            
            }
           
        }else if(value == "0"){
            if(!(operand2.length == 1 && operand2[0] == "0")){
                operand2.push(value)
            }
        }else{
            if(operand2.length == 1 && operand2[0] == "0"){
                operand2[0] = value;
            }else{
                operand2.push(value);
            }
        }   
    }
     updateDisplay()
}

function operandHasPoint(operand){
    return operand.includes(".");
}

function handleOperator(op){
    if(operand2.length > 0){
        if(!(operand2.length == 1 && operand2[0] == "-")){
            evaluate(operand1, operator, operand2)
            operand1.length = 0;
            operand1.push(answer);

            operator.length = 0;
            operator[0] = op;

            operand2.length = 0;
        }

    } else{
        if(op == "-"){
            if(operand1.length == 0){
                operand1.push(op);
            }else if(operator.length == 0){
            
                operator[0] = op;    
                
            }else if(operand2.length == 0){
                operand2.push(op)
            }
        }else{
            if(operand1.length != 0){
                if(!(operand1.length == 1 && operand1[0] == "-") ){
                    operator[0] = op;
                }
            }
        }
    }
    

    updateDisplay()
}

function handleCommand(e){
    let id = e.target.id;
    switch(id){
        case "equal":
            evaluate(operand1, operator, operand2);
            updateDisplay()
            break;
        case "clear":
            clear();
            break;
        case "del":
            del();
            break;
    }
}

function evaluate(operand1, operator, operand2){
    if(operand2.length == 0 || (operand2.length == 1 && operand2[0] ==  "-")){
        answer = "";
    }else{
        let op1 = +operand1.join("");
        let op = operator[0];
        let op2 = +operand2.join("");

        answer = operate(op1, op, op2);
    }
    

}

function updateDisplay(){
    let exp = "";
    if(operator.length == 0){
        exp = operand1.join("")
    }else if(operator.length != 0 && operand2.length == 0){
        exp = `${operand1.join("")} ${operator[0]}`
    }else{
         exp = `${operand1.join("")} ${operator[0]} ${operand2.join("")}`
    }

    expression.textContent = exp;
    result.textContent = answer;
}

function clear(){
    operand1.length = 0;
    operator.length = 0;
    operand2.length = 0;
    answer = '';
    
    updateDisplay();
    
}

function del(){
    if(operand2.length){
        operand2.pop();
        if(operand2.length >= 0){
            evaluate(operand1, operator, operand2);
        }
       
    }else if(operator.length){
        operator.pop();
    }else{
        operand1.pop();
    }
    updateDisplay();

    
}