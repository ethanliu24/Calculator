import { evaluate } from "./evaluate.js";

// Colors
const ORANGE = "#ff9500";
const HOVER_ORANGE = "#ffaf3e";
const GRAY = "#505050";
const HOVER_GRAY = "#777777";
const LIGHT_GRAY = "#d4d4d2";
const HOVER_LIGHT_GRAY = "#ebebeb";


// Document
document.addEventListener("DOMContentLoaded", initPage);
const historyBtn = document.querySelector("#history-btn");
const cacheContainer = document.querySelector("#cache-container");
const historyContainer = document.querySelector("#cache");
let lastCalculation = document.querySelector(".last-cache");
const input = document.querySelector(".input");


// Calculator Buttons
const btnContainer = document.querySelector("#btn-container");

const zeroBtn = document.querySelector("#zero-btn");
const oneBtn = document.querySelector("#one-btn");
const twoBtn = document.querySelector("#two-btn");
const threeBtn = document.querySelector("#three-btn");
const fourBtn = document.querySelector("#four-btn");
const fiveBtn = document.querySelector("#five-btn");
const sixBtn = document.querySelector("#six-btn");
const sevenBtn = document.querySelector("#seven-btn");
const eightBtn = document.querySelector("#eight-btn");
const nineBtn = document.querySelector("#nine-btn");

const equalsBtn = document.querySelector("#equals-btn")
const plusBtn = document.querySelector("#plus-btn")
const minusBtn = document.querySelector("#minus-btn")
const multiplyBtn = document.querySelector("#multiply-btn")
const divideBtn = document.querySelector("#divide-btn")

const openParenBtn = document.querySelector("#open-paren-btn")
const closeParenBtn = document.querySelector("#close-paren-btn")
const acBtn = document.querySelector("#ac-btn")
const decimalBtn = document.querySelector("#decimal-btn");

let concatenate = false;
let eqnHistory;
let ansHistory;

// Functions
function initPage() {
    initButtons();

    // init button container
    btnContainer.addEventListener("click", (e) => {
        if (e.target.id === "ac-btn" || e.target.id === "equals-btn") {
            input.blur();
            concatenate = false;
            decimalBtn.disabled = false;
            disableOperators();
            minusBtn.disabled = false;
        } else {
            input.focus();
            concatenate = true;
        }
    });

    // init history panel
    cacheContainer.style.display = "none";
    historyBtn.addEventListener("click", () => {
        if (cacheContainer.style.display != "none") {
            cacheContainer.style.display = "none";
        } else {
            cacheContainer.style.display = "flex";
        }
    })

    eqnHistory = [];
    ansHistory = [];

    // restrict input 
    input.addEventListener("input", () => {
        let patt = /^[0-9\(\)\+\-\*\/]+$/;
        
        if (patt.test(input.value)) {
            input.value = input.value;
        } else{
            let txt = input.value.slice(0, -1);
            input.value = txt;
        }
    })

    // document check for ENTER key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (input.value != "") {
                let clickEvent = new Event("click");
                equalsBtn.dispatchEvent(clickEvent);
            }
        }
    });
}


function initButtons() {
    setButtonCommonProperties(GRAY, HOVER_GRAY, 
                              zeroBtn, oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, sixBtn, 
                              sevenBtn, eightBtn, nineBtn, decimalBtn);
    setButtonCommonProperties(LIGHT_GRAY, HOVER_LIGHT_GRAY, acBtn, openParenBtn, closeParenBtn);
    setButtonCommonProperties(ORANGE, HOVER_ORANGE, equalsBtn, plusBtn, minusBtn, multiplyBtn, divideBtn);
    

    // Numbers
    zeroBtn.addEventListener("click", () => { if (input.value != "0") inputAddChar("0") });
    oneBtn.addEventListener("click", () => handleButtonClick("1"));
    twoBtn.addEventListener("click", () => handleButtonClick("2"));
    threeBtn.addEventListener("click", () => handleButtonClick("3"));
    fourBtn.addEventListener("click", () => handleButtonClick("4"));
    fiveBtn.addEventListener("click", () => handleButtonClick("5"));
    sixBtn.addEventListener("click", () => handleButtonClick("6"));
    sevenBtn.addEventListener("click", () => handleButtonClick("7"));
    eightBtn.addEventListener("click", () => handleButtonClick("8"));
    nineBtn.addEventListener("click", () => handleButtonClick("9"));
    

    // Operators
    equalsBtn.addEventListener("click", () => {
        let expr = input.value.split("").reduce((s, val) => { 
            if (val != " ") return s + val;
            return s;
        }, "");

        let ans = evaluate("(" + expr + ")");

        if (typeof ans != "number") {
            ans = "ERROR";
        }

        updateHistory(expr, ans);

        let ansShortened;
        if (ans.toString().legnth > 15) {
            ansShortened = ans.toString().substring(0, 12) + "...";
        } else {
            ansShortened = ans
        }

        if (input.value.length + ans.toString().length <= 30) {
            lastCalculation.textContent = `${expr} = ${ansShortened}`;
        } else {
            lastCalculation.textContent = `Ans = ${ansShortened}`;
        }

        input.value = ans;
        concatenate = false;
    });

    plusBtn.addEventListener("click", () => {
        concatenate = true;
        handleButtonClick("+");
        disableOperators();
        decimalBtn.disabled = false;
    });

    minusBtn.addEventListener("click", () => {
        concatenate = true;
        handleButtonClick("-")
        disableOperators();
        decimalBtn.disabled = false;
    });

    multiplyBtn.addEventListener("click", () => {
        concatenate = true;
        handleButtonClick("*")
        disableOperators();
        decimalBtn.disabled = false;
    });

    divideBtn.addEventListener("click", () => {
        concatenate = true;
        handleButtonClick("/");
        disableOperators();
        decimalBtn.disabled = false;
    });


    // Functional Buttons
    decimalBtn.addEventListener("click", (e) => {
        concatenate = true;
        inputAddChar(".");
        e.target.disabled = true;
    });

    acBtn.addEventListener("click", () => input.value = "");

    openParenBtn.addEventListener("click", () => { 
        handleButtonClick("(");
        decimalBtn.disabled = false;
    });

    closeParenBtn.addEventListener("click", () => { 
        handleButtonClick(")");
        decimalBtn.disabled = false;
    });

}


function setButtonCommonProperties(backgroundColor, hoverColor, ...args) {
    for (let arg of args) {
        arg.style.backgroundColor = backgroundColor;

        arg.addEventListener("mouseenter", (e) => {
            e.target.style.backgroundColor = hoverColor;
        });

        arg.addEventListener("mouseleave", (e) => {
            e.target.style.backgroundColor = backgroundColor;
        });
    }
}


function handleButtonClick(insertVal) {
    concatenate ? inputAddChar(insertVal) : input.value = insertVal;
    concatenate = true;
    enableOperators();
}


function inputAddChar(char) {
    input.value += char;
}


function enableOperators() {
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    multiplyBtn.disabled = false;
    divideBtn.disabled = false;
}


function disableOperators() {
    plusBtn.disabled = true;
    minusBtn.disabled = true;
    multiplyBtn.disabled = true;
    divideBtn.disabled = true;
}


function updateHistory(expr, ans) {
    let div = document.createElement("div");
    div.classList.add("history-eqn");
    let eq = document.createElement("div");
    eq.textContent = " = ";

    let id = document.createElement("span");
    id.textContent = (eqnHistory.length).toString();
    eqnHistory.push(expr);
    ansHistory.push(ans);

    let eqnBtn = createEqn(expr);
    let ansBtn = createEqn(ans);

    eqnBtn.addEventListener("click", (e) => {
        let idx = Number(e.target.parentNode.lastElementChild.textContent);
        input.value = eqnHistory[idx]
        concatenate = true;
    });

    ansBtn.addEventListener("click", (e) => {
        let idx = Number(e.target.parentNode.lastElementChild.textContent);
        input.value = ansHistory[idx]
        console.log(ansHistory)
        concatenate = true;
    });

    div.appendChild(eqnBtn);
    div.appendChild(eq);
    div.appendChild(ansBtn);
    div.appendChild(id)
    historyContainer.appendChild(div);
}


function createEqn(expr) {
    let btn = document.createElement("button");
    let txt;
    if (expr === "ERROR") {
        txt = expr;
        btn.disabled = true;
        btn.style.opacity = "0.5";
    } else if (expr.length > 30) {
        txt = expr.substring(0, 20) + "...";
    } else {
        txt = expr;
    }

    btn.textContent = txt;

    btn.addEventListener("mouseenter", (e) => {
        if (!e.target.disabled) {
            e.target.style.backgroundColor = "gray";
        }
    });

    btn.addEventListener("mouseleave", (e) => e.target.style.backgroundColor = "rgb(211, 211, 211)");

    return btn
}

