const OPERATIONS = {
    "+": (x, y) => x + y,
    "-": (x, y) => y - x,
    "*": (x, y) => x * y,
    "/": (x, y) => y / x,
}

const evaluate = function(expr) {
    // Precondition: no spaces in <expr>

    // this shit is highly inefficient but it's fine its a leetcode hard
    expr = enhanceBEDMAS(expr);  // i refuse to use an AST (i dont know to implement one)
    
    let stack = [];
    let opStack = [];
    let curNum = "";
    let sign = 1;
    const digits = "1234567890.";

    try {
        for (let i = 0; i < expr.length; i++) {
            if (digits.includes(expr[i])) {  
                curNum += expr.at(i);
                continue;
            } 


            if (curNum != "") {
                stack.push(castToNum(curNum) * sign);
                curNum = "";
                sign = 1;
            }


            if (expr.at(i) === "(") {
                if (i > 0 && (digits.includes(expr.at(i-1)) || expr.at(i-1) === ")")) {
                    opStack.push("*");
                }
                stack.push(expr.at(i))
                continue;
            } 
            

            if (expr.at(i) === ")") {
                if (stack[stack.length - 1] === "(") {
                    return undefined
                } 

                let num = stack.pop();
                while (stack[stack.length - 1] != "(" && opStack.length != 0) {
                    num = roundError(OPERATIONS[opStack.pop()](num, stack.pop()));
                }

                stack.pop();  // "("
                stack.push(num); 
                
                if (i < expr.length - 1 && digits.includes(expr.at(i+1))) {
                    opStack.push("*");
                }

                continue;
            } 

            
            if (expr[i] === "-") {
                opStack.push("+");
                sign = -1;
            } else {
                opStack.push(expr.at(i));
            }
        } 

        return stack[0];
    } catch (error) {
        console.log(error);
        return undefined
    }
}


function castToNum(s) {
    // Precondition: Contains only 1234567890. characters
    const res = s.split(".");
    if (res.length === 1) {
        return Number(s);
    }
    
    let wholeArr = res[0].split("");
    let decimalArr = res[1].split("");

    let whole = wholeArr.reduce((sum, digit, pow) => {
        return sum + (Number(digit) * Math.pow(10, wholeArr.length - pow - 1));
    }, 0);

    let decimal = decimalArr.reduce((sum, digit, pow) => {
        return sum + (Number(digit) * Math.pow(10, (pow + 1) * -1));
    }, 0);
    
    return roundError(whole + decimal);
}


function roundError(num) {
    return Math.round(num * 1e8) / 1e8;
}


function enhanceBEDMAS(s) {
    const chars = "1234567890.";
    let i = 0;

    while (i <= s.length) {
        if (s.at(i) === "*" || s.at(i) === "/") {
            let left = i - 1;
            let right = i + 1;

            while (left >= 0 && (chars + ")").includes(s.at(left))) {
                if (s.at(left) === ")") {
                    while (left >= 0 && s.at(left) != "(") { left --; }
                } 
                left --;
            }

            while (right < s.length && (chars + "(").includes(s.at(right))) {
                if (s.at(right) === "(") {
                    while (right < s.length && s.at(right) != ")") { right ++; }
                } 
                right ++;
            }

            s = (s.substring(0, left + 1) + "(" + 
                 s.substring(left + 1, right) + ")" + 
                 s.substring(right));
            i = right;
        } 

        i ++;
    }
    
    return s;
}

// module.exports = evaluate; // for testing
export { evaluate } // for main.js
