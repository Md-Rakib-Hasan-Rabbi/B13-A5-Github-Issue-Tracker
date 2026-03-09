1.  What is the difference between var, let, and const?
--> var is fuction-scoped and can be redeclared, which can lead to unexpected behaviour in loops or conditions. It also hoisted and can be redeclared which can increase the chance of bugs.
let is block scoped and can be updated later.
const is also block-scoped and it cannot be updated later. 

2. What is the spread operator (...)?
--> The spread operator expands elements of an array or object into individual elements. It is mostly used to copy arrays.

3. What is the difference between map(), filter(), and forEach()?
--> map(), filter() and forEach() are a array methods used to iterate over the arrays. 
map() applies a function to  each element and returns a new array with the transformed values. Useful to modify every element in an array.
filter() returns a new array, but it includes element that satisfy a specific condition. Useful to select certain elements from an array.
forEach() loops through the array and executes a function for each element,but does not return a new array. Useful for printing or updating variables.

4. What is an arrow function?
--> Arrow functions are ideal for short, simple functions and can be return values implicitly without using return for single expressions. It inherits 'this' from its surrounding scope. It's usefull in callbacks, unlike regular functions.

5. What are template literals?
--> Template literals are a way to create strings in JavaScript using backticks(``) instead of quotes. This allows embedding variables or expressions diectly inside strings using ${} and can span multiple lines.