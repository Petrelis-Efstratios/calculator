const current = document.querySelector(".current");
const past = document.querySelector(".past");
let currentNumber = "";
let arr = ["0"];
let result = 0;
let EQUALS = false;
let zero = () => {something("0"); changeCurrent("0");};
let one = () => {something("1"); changeCurrent("1");};
let two = () => {something("2"); changeCurrent("2");};
let three = () => {something("3"); changeCurrent("3");};
let four = () => {something("4"); changeCurrent("4");};
let five = () => {something("5"); changeCurrent("5");};
let six = () => {something("6"); changeCurrent("6");};
let seven = () => {something("7"); changeCurrent("7");};
let eigth = () => {something("8"); changeCurrent("8");};
let nine = () => {something("9"); changeCurrent("9");};
let point = () => {
    if(!current.textContent.includes(".")) {
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
    currentNumber = "";
    changeCurrent("");
    something("-");
};
let by = () => {
    currentNumber = "";
    changeCurrent("");
    something("*");
};
let devides = () => {
    currentNumber = "";
    changeCurrent("");
    something("/")
};
let AC = () => {
    currentNumber = "";
    arr = ["0"];
    result = 0;
    EQUALS = false;
    changeCurrent("AC");
    past.textContent = "";
}
let equals = () => {
    if(arr.length === 1) {
        result = arr[0];
    } else {
    past.textContent = arr.join(" ");
    for(let i = 0; i < arr.length; i++) {
            if (i === arr.length - 1) {
                arr = [result];
            } else if(arr[i] === "+") {
                result = parseFloat(parseFloat(String(Number(arr[i - 1]) + Number(arr[i + 1]))).toFixed(8));
                arr.splice(i + 1, 1, result);
            } else if(arr[i] === "-") {
                result = parseFloat(parseFloat(String(Number(arr[i - 1]) - Number(arr[i + 1]))).toFixed(8));
                arr.splice(i + 1, 1, result);
            } else if (arr[i] === "*") {
                result = parseFloat(parseFloat(String(Number(arr[i - 1]) * Number(arr[i + 1]))).toFixed(8));
                arr.splice(i + 1, 1, result);
            } else if(arr[i] === "/") {
                result = parseFloat(parseFloat(String(Number(arr[i - 1]) / Number(arr[i + 1]))).toFixed(8));
                arr.splice(i + 1, 1, result);
            }
        }
    }
    current.textContent = "= " + result;
    arr = [];
    arr.push(result);
    EQUALS = true
}
function changeCurrent(num) {
    if(num === "") {
        currentNumber = ""
        current.textContent = "";
    } else if(num === "AC") {
        currentNumber = ""
        current.textContent = "0";
    } else {
        currentNumber += num;
        current.textContent += currentNumber;
        currentNumber = ""
    }
}
function something(curNum) {
    if(Number(curNum) == curNum || curNum === ".") {
        if(arr[arr.length - 1] === "+" || arr[arr.length - 1] === "-" || arr[arr.length - 1] === "*" || arr[arr.length - 1] === "/") {
            arr.push(curNum);
        } else if(arr[arr.length - 1] === "0") {
            arr.splice(arr.length - 1, 1, curNum)
            current.textContent = current.textContent.slice(1);
        } else if(!(arr[arr.length - 1][0] === "0")) {
            arr[arr.length - 1] += curNum;
        }
    } else {
        if(arr[arr.length - 1] === "+" ||
            arr[arr.length - 1] === "-" ||
            arr[arr.length - 1] === "*" ||
            arr[arr.length - 1] === "/"){
                arr.splice(arr.length - 1, 1, curNum);
        } else {
            arr.push(curNum);
        }
        past.textContent = arr.join(" ");
    past.scrollTop = past.scrollHeight - past.clientHeight;
    }
}
window.onkeydown = function(e) {
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
            break;
        case "Delete":
            AC();
            break;
    }
}