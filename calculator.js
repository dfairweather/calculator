function add(a,b) {
    return a + b;
};

function subtract(a,b) {
    return a - b;
};

function multiply(a,b) {
    return a * b;
};

function divide(a,b) {
    return a / b;
};

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "x":
            return multiply(a,b);
        case "÷":
            return divide(a,b);

    };
};

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
let text = "";
let firstNum = "";
let secondNum = "";
let operator = "";
let isSecond = false;
let unrounded;
let afterEqual = false;

window.addEventListener('keydown', function(e) {
    let keyNum;
    switch (e.keyCode) {
        case 48:
        case 96:
            keyNum = 96;
            break
        case 49:
        case 97:
            keyNum = 97;
            break
        case 50:
        case 98:
            keyNum = 98;
            break
        case 51:
        case 99:
            keyNum = 99;
            break
        case 52:
        case 100:
            keyNum = 100;
            break
        case 53:
        case 101:
            keyNum = 101;
            break
        case 54:
        case 102:
            keyNum = 102;
            break
        case 55:
        case 103: 
            keyNum = 103;
            break
        case 56:
        case 104: 
            keyNum = 104;
            break
        case 57:
        case 105: 
            keyNum = 105;
            break
        case 111: 
        case 191:
            keyNum = 191;
            break
        case 88:
        case 106:
            keyNum = 106;
            break
        case 109:
        case 173:
            keyNum = 173;
            break
        case 107:
            keyNum = 107;
            break
        case 13:
            keyNum = 13;
            break
        case 110:
        case 190:
            keyNum = 190;
            break
        case 8:
            keyNum = 8;
            break
        case 46: 
            keyNum = 46;
            break
    }
    const key = document.querySelector(`button[data-key='${keyNum}']`);
    key.click();
});
   
    

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.className == "number" && isSecond == false && afterEqual == false && text.length < 10) {
            if (text == "80085"){
                text = "";
             
            }
            text += button.id;
            firstNum = text;

        } else if (button.className == "number" && isSecond == true && text.length < 12) {
            text += button.id;
            secondNum += button.id;

        } else if (button.className == "operator" && isSecond == false && afterEqual == false) {
            if (text != "80085" && firstNum != "") {
                operator = button.id
                isSecond = true;
                firstNum = text;
                text += " " + button.id + " ";
            }

        } else if (button.className == "operator" && afterEqual == true) {
            afterEqual = false;
            operator = button.id
            isSecond = true;
            firstNum = unrounded;
            console.log(firstNum);
            text += " " + button.id + " ";

        } else if (button.className == "operator" && isSecond == true) {
            if (secondNum != "") {
                if (operator == "÷" && +secondNum == 0) {
                    text = "80085";
                } else {
                    unrounded = operate(operator, +firstNum, +secondNum);
                    text = Math.round(operate(operator, +firstNum, +secondNum) * 100000) / 100000;
                    firstNum = unrounded;
                    text += " " + button.id + " ";
                    secondNum = ""
                    operator = button.id; 
                } 
            }
        } else if (button.id == "=") {
            if (secondNum != "") {
                if (operator == "÷" && +secondNum == 0) {
                    text = "80085";
                    firstNum = "";
                    secondNum = "";
                    operator = "";
                    isSecond = false;
                    afterEqual = false;
                } else {
                    unrounded = operate(operator, +firstNum, +secondNum);
                    text = Math.round(operate(operator, +firstNum, +secondNum) * 100000) / 100000;
                    firstNum = unrounded;
                    secondNum = "";
                    isSecond = false;
                    afterEqual = true;
                }
            } 

        } else if (button.id == "clear") {
            text = "";
            firstNum = "";
            secondNum = "";
            operator = "";
            isSecond = false;
            afterEqual = false;
        } else if (button.id == "undo") {
            if (isSecond == false) {
                text = text.slice(0,-1);
                firstNum = text;
            } else if (isSecond == true && afterEqual == false) {
                if (secondNum.length > 0) {
                    secondNum = secondNum.slice(0,-1);
                    text = text.slice(0,-1);
                } else {
                    text = text.slice(0,-3);
                    isSecond = false;
                }

            }
        }
        
        display.textContent = text;
    });
});