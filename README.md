# Calculator
A calculator supporting basic arithmetic operations and UI. Inspired by the OdinProject's calculator project.


# Functionalities
The calculator supports addition, subtraction, multiplication, division and brackets on integers and floating point numbers. The user can enter value via keyboard (note that unnecessary keys are disabled) or via interaction with the UI.

On the top right, there is a "All History" button which allows users to navigate their calculation history. Users can click on the equations to restore them in the input screen.


# Limitations
The evaluation algorithm is far from perfect, and as a result may computes the wrong values some equations. This is because I refuse to use an AST data structure (I don't know how to implement one). But in short, the algorithm computes values in brackets backwards as it pops from stacks, which causes the wrong direction of computation. Maybe I will fix this one day, but I would like to take a break from this LeetCode hard level problem. Perhaps I will know what to do after solving Q224 on LeetCode sometime in the future, but for now, if there's computational errors, users can add brackets around expressions to emphasize what they want to compute first.

Note that the algorithm passes the tests in testEval.spec.js, but the test suit does not cover all possibilities and edge cases.
