const operations = document.querySelector(".operations");
const current = document.querySelector(".current");
const past = document.querySelector(".past");
const operation = [];
let currentNumber = "";
let PLUS = false;
let zero = () => {currentNumber += 0; changeCurrent()};
let one = () => {currentNumber += 1; changeCurrent()};
let two = () => {currentNumber += 2; changeCurrent()};
let three = () => {currentNumber += 3; changeCurrent()};
let four = () => {currentNumber += 4; changeCurrent()};
let five = () => {currentNumber += 5; changeCurrent()};
let six = () => {currentNumber += 6; changeCurrent()};
let seven = () => {currentNumber += 7; changeCurrent()};
let eigth = () => {currentNumber += 8; changeCurrent()};
let nine = () => {currentNumber += 9; changeCurrent()};
let plus = () => {PLUS = true; past.textContent += currentNumber + "+"; currentNumber = ""; changeCurrent()};
//let minus = () => ;
//let by = () => ;
//let devides = () => ;
function changeCurrent() {
    current.textContent = currentNumber;
}
window.onkeydown = function(e) {
    switch(e.keyCode) {
        case 48:
            zero();
            break;
        case 49:
            one();
            break;
        case 50:
            two();
            break;
        case 51:
            three();
            break;
        case 52:
            four();
            break;
        case 53:
            five();
            break;
        case 54:
            six();
            break;
        case 55:
            seven();
            break;
        case 56:
            eigth();
            break;
        case 57:
            nine();
            break;
    }
}