const current = document.querySelector(".current");
const past = document.querySelector(".past");
let currentNumber = "";
let arr = ["0"];
let result = 0;
let EQUALS = false;
let zero = () => {something("0"); changeCurrent("number");};
let one = () => {something("1"); changeCurrent("number");};
let two = () => {something("2"); changeCurrent("number");};
let three = () => {something("3"); changeCurrent("number");};
let four = () => {something("4"); changeCurrent("number");};
let five = () => {something("5"); changeCurrent("number");};
let six = () => {something("6"); changeCurrent("number");};
let seven = () => {something("7"); changeCurrent("number");};
let eigth = () => {something("8"); changeCurrent("number");};
let nine = () => {something("9"); changeCurrent("number");};
let point = () => {
    if(!current.textContent.includes(".") || EQUALS) {
        something(".");
        changeCurrent(".");
    }
}
let plus = () => {
    currentNumber = "";
    changeCurrent("");
    something("+");
};
let minus = () => {
    changeCurrent("");
    something("−");
};
let by = () => {
    changeCurrent("");
    something("×");
};
let devides = () => {
    changeCurrent("");
    something("÷")
};
let AC = () => {
    arr = ["0"];
    result = 0;
    EQUALS = false;
    changeCurrent("AC");
    past.textContent = "";
}
function backspace() {
    if(!EQUALS) {
        if(current.textContent.length === 1 && !past.textContent) {
            past.textContent = "";
            arr = ["0"];
            current.textContent = "0";
        } else if(current.textContent.length === 1 && past.textContent) {
            current.textContent = "";
            arr.splice(arr.length - 1, 1);
        } else if(current.textContent) {
            arr[arr.length - 1] = arr[arr.length - 1].substring(0, arr[arr.length - 1].length - 1);
            current.textContent = current.textContent.substring(0, current.textContent.length - 1);
        } else if(arr[arr.length - 1] === "+" || arr[arr.length - 1] === "−" || arr[arr.length - 1] === "×" || arr[arr.length - 1] === "÷") {
            arr.splice(arr.length - 1, 1);
            past.textContent = arr.slice(0, -1).join(" ");
            current.textContent = arr[arr.length - 1];
        } else {
            arr[arr.length - 1] = arr[arr.length - 1].substring(0, arr[arr.length - 1].length - 1);
            current.textContent = current.textContent.substring(0, current.textContent.length - 1);
            past.textContent = arr.join(" ");
        }
        changeCurrent("backspace");
    }
}
let equals = () => {
    if(arr.length < 2) {
        result = String(Math.round(arr[0]));
    } else {
        past.textContent = arr.join(" ");
        result = arr[arr.length - 2];
        if(past.textContent.substring(0, past.textContent.length - 1).includes("×") || past.textContent.substring(0, past.textContent.length - 1).includes("÷")) {
        for(let i = 0; i < arr.length; i++) {
            if (arr[i] === "×") {
                result = String(parseFloat(parseFloat(String(Number(arr[i - 1]) * Number(arr[i + 1]))).toFixed(8)));
                arr.splice(i - 1, 3, result);
                i--;
            } else if(arr[i] === "÷") {
                result = String(parseFloat(parseFloat(String(Number(arr[i - 1]) / Number(arr[i + 1]))).toFixed(8)));
                arr.splice(i - 1, 3, result);
                i--;
        }
    }
}
    for(let i = 0; i < arr.length; i++) {
            if(i === arr.length - 1) {
                arr = [result];
            } else if(arr[i] === "+") {
                result = String(parseFloat(parseFloat(String(Number(arr[i - 1]) + Number(arr[i + 1]))).toFixed(8)));
                arr.splice(i + 1, 1, result);
            } else if(arr[i] === "−") {
                result = String(parseFloat(parseFloat(String(Number(arr[i - 1]) - Number(arr[i + 1]))).toFixed(8)));
                arr.splice(i + 1, 1, result);
            }
        }
    }
    if(result === "Infinity" || result === "NaN") {
         current.textContent = "You can't devide by 0";           
    } else {
        current.textContent = "= " + result;
    }
    EQUALS = true;
}
function changeCurrent(num) {
    if(num === "number" || num === ".") {
        current.textContent = arr[arr.length - 1];
    } else if (num === "") {
        current.textContent = "";
    } else if(num === "backspace") {
        if(Number(arr[arr.length - 1]) == arr[arr.length - 1]) {
            current.textContent = arr[arr.length - 1];
        }
    } else if(num === "AC") {
        current.textContent = "0";
    }
}
function something(curNum) {
    if(Number(curNum) == curNum || curNum === ".") {
        if(arr[arr.length - 1] === "+" || arr[arr.length - 1] === "−" || arr[arr.length - 1] === "×" || arr[arr.length - 1] === "÷") {
            if(curNum === ".") {
                arr.push(`0${curNum}`);
            } else {
                arr.push(curNum);
            }
        } else if(arr[arr.length - 1] === "0" && curNum === ".") {
            arr[arr.length - 1] = "0.";
        } else if(arr[arr.length - 1] === "0") {
            arr.splice(arr.length - 1, 1, curNum)
            current.textContent = current.textContent.slice(1);
        } else if(EQUALS && curNum === ".") {
            arr = ["0."];
            EQUALS = false;
            past.textContent = "";
        } else if(EQUALS) {
            arr = [curNum];
            past.textContent = "";
        } else {
            arr[arr.length - 1] += curNum;
        }
    } else {
        if(arr[arr.length - 1] === "+" || arr[arr.length - 1] === "−" || arr[arr.length - 1] === "×" || arr[arr.length - 1] === "÷") {
            arr.splice(arr.length - 1, 1, curNum);
        } else if(arr[0] === "Infinity" || arr[0] === ["NaN"]) {
            arr = ["0", curNum];
        } else if(Math.round(arr[arr.length - 1]) == arr[arr.length - 1]) {
            arr.splice(arr.length - 1, 1, String(Math.round(arr[arr.length - 1])));
            arr.push(curNum);
        } else {
            arr.push(curNum);
        }
    past.textContent = arr.join(" ");
    past.scrollTop = past.scrollHeight - past.clientHeight;
    }
    EQUALS = false;
}
window.onkeydown = function(e) {
    let buttonKey = e.key
    switch(e.key) {
        case "0":
            zero();
            break;
        case "1":
            one();
            break;
        case "2":
            two();
            break;
        case "3":
            three();
            break;
        case "4":
            four();
            break;
        case "5":
            five();
            break;
        case "6":
            six();
            break;
        case "7":
            seven();
            break;
        case "8":
            eigth();
            break;
        case "9":
            nine();
            break;
        case "+":
            plus();
            break;
        case "-":
            minus();
            break;
        case "*":
            by();
            break;
        case "/":
            devides();
            break;
        case ".":
            point();
            break;
        case "=":
            equals();
            break;
        case "Enter":
            equals();
            buttonKey = "="
            break;
        case "Delete":
            AC();
            break;
        case "Backspace":
            backspace();
            break;
    }
    const button = document.querySelector(`[key="${buttonKey}"]`);
    if(button.classList.value === "AC" || button.classList.value === "backspace") {
        button.style.cssText = "bottom: 3px; border: 4px solid #ff1300";
    } else if(button.classList.value === "equals") {
        button.style.cssText = "bottom: 3px; border: 4px solid #36f509";
    } else {
    button.style.cssText = "bottom: 3px; border: 4px solid #eb1e88";
    }
    setTimeout(() => {button.style.cssText = ""}, 200);
}