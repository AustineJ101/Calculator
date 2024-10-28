const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
 return b == 0? "Math Error": a / b;
} 
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
  if(array[0] == "0" && (array[1] > 0 || array[1] == "0")){
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

    return Number.isInteger(result) || isNaN(result)? result 
    :Number(result.toFixed(4));  
}

function renderResult(result){
  output.lastElementChild.textContent = result;
 
 }
 
 function clear(){
   output.firstElementChild.textContent = '';
   output.lastElementChild.textContent = '';
 
 };


function handleExpression(event){
  let isFirstNumEmpty;
  let isSecondNumEmpty;

  switch(event.target.id){
    case "operator":
     

      if(output.lastElementChild.textContent && !isNaN(output.lastElementChild.textContent)){
        // The second check ensures that chain operation does not proceed if Math Error is displayed
          firstNum = [output.lastElementChild.textContent];
      } 

      isFirstNumEmpty = isEmpty(firstNum);
      isSecondNumEmpty = isEmpty(secondNum);

      
      if(isFirstNumEmpty){
          if(event.target.textContent === "-"){
            firstNum.push(event.target.textContent);
          
          }
        
      } else if(isSecondNumEmpty ){
            if(operator){
                if(event.target.textContent === "-"){
                    secondNum.push(event.target.textContent);
                }
              
            }else{
                if(isOnlyNegativeSign(firstNum)){
                    // This check ensures that the first num array cannot have more that 1 negative sign
                } else{
                    operator = event.target.textContent;
                }
            
            }

      } else{

          if(isOnlyNegativeSign(secondNum)){
              //  This ensures that chain operation does not proceed if the secondNum array only has a neg sign
              // Also ensures that the secondNum cannot have more that one neg sign
          }else{
              result = operate(firstNum, operator, secondNum);
              firstNum = [result];
              operator = event.target.textContent;
              secondNum = [];
          }
        

      }

      renderExpression(operator);

    break;

    case "number":
      // Presence of an operator determines whether or not we're entering the 1st or 2nd operator
        if(!operator){
            firstNum.push(event.target.textContent);
      
        } else{
            secondNum.push(event.target.textContent);
          
        }

        removeLeadingZero(firstNum);
        renderExpression(operator);
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

        } else if(operator){
            operator = "";

        } else if(!isFirstNumEmpty){
            firstNum.pop();
        }

        renderExpression(operator);
      break;

    case "point":
        isSecondNumEmpty = isEmpty(secondNum);
        isFirstNumEmpty = isEmpty(firstNum);

         if(operator){
              if(isSecondNumEmpty){
                  secondNum.push("0.");
              } else{
                  let pointPresent = hasPoint(secondNum);
                  if(pointPresent){
                    // This check prevents having more than one point in the second operand
                  }else{
                      secondNum.push(".");
                  }
              }
          } else{
              if(isFirstNumEmpty || (firstNum.length == 1 && firstNum[0] == "-")){
                firstNum.push("0.");

              } else{
                let pointPresent = hasPoint(firstNum);
                if(pointPresent){
                  // Prevents having more than one point in the 1st operand
                }else{
                  firstNum.push(".");
          
                }
              }
            }

          renderExpression(operator);
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

keys.addEventListener("click", handleExpression);



function renderExpression(operator){
    let first = firstNum.length > 0?  firstNum.slice().join('') : "";
    let second = secondNum.length > 0? secondNum.slice().join(''): "";

    if(output.lastElementChild.textContent){
        output.lastElementChild.textContent = '';
    }

    if(first && second){
        output.firstElementChild.textContent = `${first} ${operator} ${second}`;
    } else if(!second && operator){
        output.firstElementChild.textContent = `${first} ${operator}`;
    } else if(!second && !operator){
        output.firstElementChild.textContent = `${first}`;
    }

}


