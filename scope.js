function getStudentName() {
    // assignment to an undeclared variable :(
    nextStudent = "Suzy";
}

getStudentName();

console.log(nextStudent);
// "Suzy" -- oops, an accidental-global variable!
//if not in strict mode => would declare nextStudent in global scope
//else => throw ReferenceError


//=================================================================
var studentName = "Suzy";

function printStudent(studentName) {
    studentName = studentName.toUpperCase();
    console.log(studentName);
}

printStudent("Frank");
// FRANK

printStudent(studentName);
// SUZY

console.log(studentName);
// Suzy

//=================================================
var studentName = "Suzy";

function printStudent(studentName) {
    console.log(studentName);
    console.log(window.studentName);
}

printStudent("Frank");
// "Frank"
// "Suzy"

//===============================================
var special = 42;

function lookingFor(special) {
    // The identifier `special` (parameter) in this
    // scope is shadowed inside keepLooking(), and
    // is thus inaccessible from that scope.
    console.log(special);
    function keepLooking() {
        var special = 3.141592;
        console.log(special);
        // console.log(window.special);
    }

    keepLooking();
}

lookingFor(112358132134);
console.log(special);
// 112358132134
// 3.141592
// 42

//=======================================================
function another() {
    // ..

    {
        let special = "JavaScript";

        ajax("https://some.url", function callback() {
            // totally fine shadowing
            var special = "JavaScript";

            // ..
        });
    }
}

//===================================================
var askQuestion = function ofTheTeacher() {
    "use strict";
    ofTheTeacher = 42;   // TypeError

    //..
};

askQuestion();
// TypeError

//==================================================
var name = 42;

console.log(name, typeof name);
// "42" string //this result run on browser

//===================================================
var studentName = "Kyle";
let studentID = 42;

function hello() {
    console.log(`Hello, ${self.studentName}!`);
}

self.hello();
// Hello, Kyle!

self.studentID;
// undefined

//===================================================
const theGlobalScopeObject =
    (new Function("return this"))();

console.log(theGlobalScopeObject)


//===================================================
const theGlobalScopeObject =
    (typeof globalThis != "undefined") ? globalThis :
        (typeof global != "undefined") ? global :
            (typeof window != "undefined") ? window :
                (typeof self != "undefined") ? self :
                    (new Function("return this"))();

console.log(theGlobalScopeObject)
//===================================================
greeting();
// TypeError, can't be hoisting

var greeting = function abc() {
    console.log("Hello!");
};

console.log(`type of  ${typeof greeting}`)
greeting();
abc(); //is not defined

//======================================================
greeting = "Hello!";
console.log(greeting); // Hello!

var greeting = "Howdy!";
console.log(greeting); //Howdy!

//======================================================
var studentName = "Frank";
console.log(studentName);
// Frank

var studentName;
console.log(studentName);   // ???

//======================================================
var greeting;

function greeting() {
    console.log("Hello!");
}

// basically, a no-op
var greeting;

typeof greeting;        // "function"

var greeting = "Hello!";

typeof greeting;        // "string"

//======================================================
var keepGoing = true;
while (keepGoing) {
    // ooo, a shiny constant!
    const value = Math.random();
    console.log(value)
    if (value > 0.5) {
        keepGoing = false;
    }
}

//=====================================================
console.log(studentName);
// ReferenceError

let studentName = "Suzy";

//======================================================
studentName = "Suzy";   // let's try to initialize it!
// ReferenceError

console.log(studentName);

let studentName;

//====================================================
askQuestion();
// ReferenceError due to TDZ    

let studentName = "Suzy";

function askQuestion() {
    console.log(`${studentName}, do you know?`);
}

//=====================================================
var studentName = "Kyle";

{
    console.log(studentName);
    // ??? => throw ReferenceError, let variable has been hoisted but in TDZ

    // ..

    let studentName = "Suzy";

    console.log(studentName);
    // Suzy
}

//===================================================
{
    // not necessarily a scope (yet)

    // ..

    // now we know the block needs to be a scope
    let thisIsNowAScope = true;

    for (let i = 0; i < 5; i++) {
        // this is also a scope, activated each
        // iteration
        if (i % 2 == 0) {
            // this is just a block, not a scope
            console.log(i);
        }
    }
}
// 0 2 4

//===================================================

function diff(x, y) {
    if (x > y) {
        var tmp = x;    // `tmp` is function-scoped
        x = y;
        y = tmp;
    }

    return y - x;
}

//====================================================
try {
    doesntExist();
}
catch (err) {
    console.log(err);
    // ReferenceError: 'doesntExist' is not defined
    // ^^^^ message printed from the caught exception

    let onlyHere = true;
    var outerVariable = true;
}

console.log(outerVariable);     // true

console.log(err);
// ReferenceError: 'err' is not defined
// ^^^^ this is another thrown (uncaught) exception

//======================================================
if (false) {
    function ask() {
        console.log("Does this run?");
    }
}
ask();//throw TypeError

//====================================================
if (true) {
    function ask() {
        console.log("Am I called?");
    }
}

if (true) {
    function ask() {
        console.log("Or what about me?");
    }
}

for (let i = 0; i < 5; i++) {
    function ask() {
        console.log("Or is it one of these?");
    }
}

ask();

function ask() {
    console.log("Wait, maybe, it's this one?");
}

//output: Or is it one of these?