// outer/global scope: RED(1)

function lookupStudent(studentID) {
    // function scope: BLUE(2)

    var students = [
        { id: 14, name: "Kyle" },
        { id: 73, name: "Suzy" },
        { id: 112, name: "Frank" },
        { id: 6, name: "Sarah" }
    ];

    return function greetStudent(greeting) {
        // function scope: GREEN(3)

        var student = students.find(
            student => student.id == studentID
        );

        return `${greeting}, ${student.name}!`;
    };
}

var chosenStudents = [
    lookupStudent(6),
    lookupStudent(112)
];

// accessing the function's name:
chosenStudents[0].name;
// greetStudent

chosenStudents[0]("Hello");
// Hello, Sarah!

chosenStudents[1]("Howdy");
// Howdy, Frank!

//==============================================
function makeCounter() {
    var count = 0;

    return function getCurrent() {
        count = count + 1;
        return count;
    };
}

var hits = makeCounter();

// later

hits();     // 1

// later

hits();     // 2
hits();     // 3

//============================================
var studentName = "Frank";

var greeting = function hello() {
    // we are closing over `studentName`,
    // not "Frank"
    console.log(
        `Hello, ${studentName}!`
    );
}

// later

studentName = "Suzy";

// later

greeting();
// Hello, Suzy!

//=========================================
var keeps = [];

for (var i = 0; i < 3; i++) {
    keeps[i] = function keepI() {
        // closure over `i`
        return i;
    };
}

keeps[0]();   // 3 -- WHY!? because i is reassigned repeatedly and closure just linked with i
keeps[1]();   // 3
keeps[2]();   // 3

//===========================================
var keeps = [];

for (var i = 0; i < 3; i++) {
    // new `j` created each iteration, which gets
    // a copy of the value of `i` at this moment
    let j = i;

    // the `i` here isn't being closed over, so
    // it's fine to immediately use its current
    // value in each loop iteration
    keeps[i] = function keepEachJ() {
        // close over `j`, not `i`!
        return j;
    };
}
keeps[0]();   // 0
keeps[1]();   // 1
keeps[2]();   // 2

//=========================================
var keeps = [];

for (let i = 0; i < 3; i++) {
    // the `let i` gives us a new `i` for
    // each iteration, automatically!
    keeps[i] = function keepEachI() {
        return i;
    };
}
keeps[0]();   // 0
keeps[1]();   // 1
keeps[2]();   // 2

//=Common Closures: Ajax and Events=======================================
function lookupStudentRecord(studentID) {
    ajax(
        `https://some.api/student/${studentID}`,
        function onRecord(record) {
            console.log(
                `${record.name} (${studentID})`
            );
        }
    );
}

lookupStudentRecord(114);
// Frank (114)

//========================================
function listenForClicks(btn, label) {
    btn.addEventListener("click", function onClick() {
        console.log(
            `The ${label} button was clicked!`
        );
    });
}

var submitBtn = document.getElementById("submit-btn");

listenForClicks(submitBtn, "Checkout");

//not clousure case: due to greeting, myName and output function in the same scope
function say(myName) {
    var greeting = "Hello";
    output();

    function output() {
        console.log(
            `${greeting}, ${myName}!`
        );
    }
}

say("Kyle");
// Hello, Kyle!

//========================================
function greetStudent(studentName) {
    return function greeting() {
        console.log(
            `Hello, ${studentName}!`
        );
    };
}

greetStudent("Kyle");

// nothing else happens