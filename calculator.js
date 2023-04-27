const current = document.querySelector(".current");
const past = document.querySelector(".past");
let arr = ["0"];
let result = 0;
let EQUALS = false;
let button = (input, type) => {changeArray(input); changeCurrent(type)}
let point = () => {
    if(!current.textContent.includes(".")) {
        changeArray(".");
        changeCurrent(".");
    }
}
let AC = () => {
    arr = ["0"];
    result = 0;
    EQUALS = false;
    changeCurrent("AC");
    past.textContent = "";
}
let backspace = () => {
    if(!EQUALS) {
        if((current.textContent.length === 1 && !past.textContent) || (arr[0] === "−" && arr[1].length === 1 && arr.length === 2)) {
            past.textContent = "";
            arr = ["0"];
            current.textContent = "0";
        } else if(current.textContent.length === 1 && past.textContent) {
            current.textContent = "";
            arr.splice(arr.length - 1, 1);
        } else if(arr[0] === "−"  && arr.length === 3) {
            arr.splice(arr.length - 1, 1);
            past.textContent = "";
            current.textContent = arr.join(" ");
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
    }
}
let equals = () => {
    if(arr.length < 3 && arr[0] !== "−") {
        arr = [String(Number(arr[0]))];
        result = arr[0];
    } else if(arr.length < 4 && arr[0] === "−") {
        arr = ["−", String(Number(arr[1]))];
        result = arr[1];
    } else {
        !isNaN(arr[arr.length - 1]) ? arr[arr.length - 1] = String(Number(arr[arr.length - 1])) : null;
        past.textContent = arr.join(" ");
        arr[0] === "−" ? arr.splice(0, 2, String(arr[1] * - 1)) : null;
        for(let i = 0; i < arr.length - 1; i++) {
            if(arr[i] === "×") {
                result = String(Number((Number(arr[i - 1]) * Number(arr[i + 1])).toFixed(8)));
                arr.splice(i - 1, 3, result);
                i--;
            } else if(arr[i] === "÷") {
                result = String(Number((Number(arr[i - 1]) / Number(arr[i + 1])).toFixed(8)));
                arr.splice(i - 1, 3, result);
                i--;
            }
        }
        for(let i = 0; i < arr.length; i++) {
            if(i === arr.length - 1) {
                arr = [result];
            } else if(arr[i] === "+") {
                result = String(Number((Number(arr[i - 1]) + Number(arr[i + 1])).toFixed(8)));
                arr.splice(i + 1, 1, result);
            } else if(arr[i] === "−") {
                result = String(Number((Number(arr[i - 1]) - Number(arr[i + 1])).toFixed(8)));
                arr.splice(i + 1, 1, result);
            }
        }
        if(result < 0) {
            arr.splice(0, 1, "−", String(result * (-1)));
        }
    }
    if(result === "Infinity" || result === "NaN") {
        current.textContent = "You can't devide by 0";           
    } else {
        current.textContent = "= " + arr.join(" ");
    }
    EQUALS = true;
}
function changeCurrent(type) {
    if(arr.length === 2 && arr[0] === "−" && (type === "number" || type === ".")) {
        current.textContent = arr.join(" ");
    } else if(type === "number" || type === ".") {
        current.textContent = arr[arr.length - 1];
    } else if(type === "operator") {
        current.textContent = "";
    }  else if(type === "AC") {
        current.textContent = "0";
    }
}
function changeArray(input) {
    if(!isNaN(input) || input === ".") {
        if(isNaN(arr[arr.length - 1])) { //true if + − × ÷
            if(input === ".") {
                arr.push("0.");
            } else {
                arr.push(input);
            }
        } else if(EQUALS && input === ".") {
            arr = ["0."];
            past.textContent = "";
        } else if(EQUALS) {
            arr = [input];
            past.textContent = "";
        } else if(arr[arr.length - 1] === "0" && input !== ".") {
            arr.splice(arr.length - 1, 1, input)
        } else if(input === "." && !current.textContent.includes(".")) {
            arr[arr.length - 1] += ".";
        } else if ((arr[arr.length - 1].split(".")[0].length < 11 && !arr[arr.length - 1].includes(".")) //if you have enter a number before the period
        || (arr[arr.length - 1].includes(".") && (!arr[arr.length - 1].split(".")[1] || arr[arr.length - 1].split(".")[1].length < 8))) { //if you have entered a number after the period
            arr[arr.length - 1] += input;
        }
    } else if(isNaN(input)) {
        if(arr[arr.length - 1] === "+" || arr[arr.length - 1] === "−" || arr[arr.length - 1] === "×" || arr[arr.length - 1] === "÷") {
            arr.splice(arr.length - 1, 1, input);
        } else if(arr[0] === "Infinity" || arr[0] === ["NaN"]) {
            arr = ["0", input];
        } else {
            arr.splice(arr.length - 1, 1, String(Number(arr[arr.length - 1])));
            arr.push(input);
        }
    past.textContent = arr.join(" ");
    past.scrollTop = past.scrollHeight - past.clientHeight;
    }
    EQUALS = false;
}
window.onkeydown = function(e) {
    if(e.key === "Enter" || e.key === "/") {
        e.preventDefault(); //So that buttons don't be pressed with Enter and disable quick find in Firefox
    }
    let buttonKey = e.key;
    if(!isNaN(e.key)) {
        button(e.key, "number");
    } else if(e.key === "+") {
        button("+", "operator");
    } else if(e.key === "-") {
        button("−", "operator");
    } else if(e.key === "*") {
        button("×", "operator");
    } else if(e.key === "/") {
        button("÷", "operator");
    } else if (e.key === ".") {
        point();
    } else if (e.key === "=" || e.key === "Enter") {
        equals();
        buttonKey = "=";
    } else if(e.key === "Delete" || e.key === "Escape") {
        AC();
        buttonKey = "Delete";
    } else if(e.key === "Backspace") {
        backspace();
    }
    if(!isNaN(buttonKey) ||  buttonKey === "+" || buttonKey === "-" || buttonKey === "*" || buttonKey === "/" || buttonKey === "=" || buttonKey === "." || buttonKey === "Delete" || buttonKey === "Backspace") {
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
}  