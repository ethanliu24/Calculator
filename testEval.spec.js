const evaluate = require('./evaluate.js');

describe("evaluate", () => {
    test("Test basic operations", () => {
        expect(evaluate("(1 + 1)")).toBe(2);
        expect(evaluate("(1- 1)")).toBe(0);
        expect(evaluate("(2*2)")).toBe(4);
        expect(evaluate("(2  / 2  )")).toBe(1)
    });

    test("Test bedmas without parentheses", () => {
        expect(evaluate("(1+2  - 3)")).toBe(0);
        expect(evaluate("(3 * 4 - 2)")).toBe(10);
        expect(evaluate("(2 + 4 / 2)")).toBe(4);
    });

    test("Test bedmas with brackets", () => {
        expect(evaluate("(2+(2  - 3))")).toBe(1);
        expect(evaluate("((4 / (4 - 2) ))")).toBe(2);
        expect(evaluate("((2 + 2 )* 4)")).toBe(16);
        expect(evaluate("(3(4+5(3*3)))")).toBe(147);
    });

    test("Test negative numbers", () => {
        expect(evaluate("(-1 + 1)")).toBe(0);
        expect(evaluate("(5 + (-1))")).toBe(4);
    });

    test("Test operations that causes error", () => {
        expect(evaluate("(1/0)")).toBe(Infinity);
        expect(evaluate("())")).toBe(undefined);
        expect(evaluate("(1+2 - 33 (())")).toBe(undefined);
    });
});
