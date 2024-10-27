const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const remainder = (a, b) => a % b;

const output = document.querySelector(".output");
const keys  = document.querySelector(".keys-sect");

let firstNum = [];
let operator  = '';
let secondNum = [];

let result;

function isEmpty(array){
  return array.length == 0? true: false;
}

function isOnlyNegativeSign(array){
  return array.length == 1 && array[0] == "-"? true
        :false;  
}

function removeLeadingZero(array){
  if(array[0] === "0" && (array[1] > 0 || array[1] === "0")){
    array.shift();
  }
  
}

function hasPoint(array){
  return array.includes("0.") || array.includes(".")? true : false;
}

function operate(first, op, second){
  let operand1 = Number(first.join(''));
  let operator = op;
  let operand2 = Number(second.join(''));

  switch(operator){
    case "+":
      result = add(operand1, operand2);
      break;
    case "-":
      result = subtract(operand1, operand2);
      break;
    case "/":
      result = divide(operand1, operand2);
      break;
    case "*":
      result = multiply(operand1, operand2);
      break;
    case "%":
      result = remainder(operand1, operand2);
      break;
  }

    return Number.isInteger(result)? result 
    :Number(result.toFixed(4));  
}




function getValue(event){
  let isFirstNumEmpty;
  let isSecondNumEmpty;
  switch(event.target.id){
    case "operator":
     isFirstNumEmpty = isEmpty(firstNum);
     isSecondNumEmpty = isEmpty(secondNum);
    
    if(isFirstNumEmpty){
      if(event.target.textContent === "-"){
        firstNum.push(event.target.textContent);
        renderSign(event.target.textContent);
    }
    } else if(isSecondNumEmpty){
        operator = isOnlyNegativeSign(firstNum)? ""
        :event.target.textContent;
        renderExpession(operator);
    } else{
      result = operate(firstNum, operator, secondNum);
      firstNum = [result];
      operator = event.target.textContent;
      secondNum = [];

      renderResult(result);

    }

      break;

    case "number":
      if(!operator){
        firstNum.push(event.target.textContent);
         removeLeadingZero(firstNum);
         renderExpession(operator);
    
      } else{
        secondNum.push(event.target.textContent);
        removeLeadingZero(secondNum);
        renderExpession(operator);
      }

      break;

    case "clearBtn":
      firstNum = [];
      operator = "";
      secondNum = [];

      clear();

      break;

    case "deleteBtn":
      isSecondNumEmpty = isEmpty(secondNum);
      isFirstNumEmpty = isEmpty(firstNum);
      if(!isSecondNumEmpty){
        secondNum.pop();
        renderExpession(operator);
      } else if(operator){
        operator = "";
        renderExpession(operator);
      } else if(!isFirstNumEmpty){
        firstNum.pop();
        renderExpession(operator);
      }
      break;

    case "point":
      isSecondNumEmpty = isEmpty(secondNum);
      isFirstNumEmpty = isEmpty(firstNum);
      if(operator){
          if(isSecondNumEmpty){
            secondNum.push("0.");
            renderExpession(operator);
          } else{
            let pointPresent = hasPoint(secondNum);
            if(pointPresent){

            }else{
              secondNum.push(".");
              renderExpession(operator);
            }
          }
      } else{
        if(isFirstNumEmpty || (firstNum.length == 1 && firstNum[0] == "-")){
          firstNum.push("0.");
          renderExpession(operator);
        } else{
          let pointPresent = hasPoint(firstNum);
          if(pointPresent){

          }else{
            firstNum.push(".");
            renderExpession(operator);
          }
        }
      }
      break;

    case "equalBtn":
      isFirstNumEmpty = isEmpty(firstNum);
      isSecondNumEmpty = isEmpty(secondNum);
    
      if(!isFirstNumEmpty && !isSecondNumEmpty){
       result = operate(firstNum, operator, secondNum);
       firstNum = [];
       operator = '';
       secondNum = [];

       renderResult(result);
      }
      break;
  }
}

keys.addEventListener("click", getValue);



function renderExpession(operator){
  let first = firstNum.length > 0?  firstNum.slice().join('') : "";
  let second = secondNum.length > 0? secondNum.slice().join(''): "";
  
  if(first && second){
    output.firstElementChild.textContent = `${first} ${operator} ${second}`;
  } else if(!second && operator){
    output.firstElementChild.textContent = `${first} ${operator}`;
  } else if(!second && !operator){
    output.firstElementChild.textContent = `${first}`;
  }

}

function renderSign(operator){
  output.firstElementChild.textContent = operator;
}

function renderResult(result){
 output.lastElementChild.textContent = result;

}

function clear(){
  output.firstElementChild.textContent = '';
  output.lastElementChild.textContent = '';

}
