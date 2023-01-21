const current = document.querySelector(".current");
const past = document.querySelector(".past");
let currentNumber = "";
let arr = [];
let result = 0;
let num = [];
let EQUALS = false;
let zero = () => {changeCurrent("0"); something("0");};
let one = () => {changeCurrent("1"); something("1");};
let two = () => {changeCurrent("2"); something("2");};
let three = () => {changeCurrent("3"); something("3");};
let four = () => {changeCurrent("4"); something("4");};
let five = () => {changeCurrent("5"); something("5");};
let six = () => {changeCurrent("6"); something("6");};
let seven = () => {changeCurrent("7"); something("7");};
let eigth = () => {changeCurrent("8"); something("8");};
let nine = () => {changeCurrent("9"); something("9");};
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
    arr = [];
    result = 0;
    num = [];
    EQUALS = false;
    x = 0;
    changeCurrent("");
    past.textContent = "";
}
let equals = () => {
    past.textContent += currentNumber;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === "+") {
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
    current.textContent = "= " + result;
    arr = [];
    arr.push(result);
    x = 0;
    num = [];
    EQUALS = true
}
function changeCurrent(num) {
    //if(arr[x] === undefined || !(arr[x][0] === "0")) {
    currentNumber += num;
    current.textContent = currentNumber;
    //}
}
/*function pastContent(oper) {
    if(EQUALS) {
        past.textContent = `${result} ${oper} `;
        EQUALS = false;
        result = 0;
    } else if(arr[x] === "+" ||
        arr[x] === "-" ||
        arr[x] === "*" ||
        arr[x] === "/") {
            past.textContent = past.textContent.slice(0, -2) + `${oper} `;
    } else {
        past.textContent += `${currentNumber} ${oper} `;
    }
    past.scrollTop = past.scrollHeight - past.clientHeight;
}*/
function something(curNum) {
    if(Number(curNum) == curNum) {
        if(typeof arr[arr.length -1] === "undefined" || arr[arr.length - 1] === "+" || arr[arr.length - 1] === "-" || arr[arr.length - 1] === "*" || arr[arr.length - 1] === "/") {
            arr.push(curNum);
        } else if(!(arr[arr.length - 1][0] === "0")) {
            arr[arr.length - 1] += curNum
        }
    } else {
        if(arr[arr.length - 1] === "+" ||
            arr[arr.length - 1] === "-" ||
            arr[arr.length - 1] === "*" ||
            arr[arr.length - 1] === "/"){
                arr.splice(x, 1, curNum);
        } else {
            x++;
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