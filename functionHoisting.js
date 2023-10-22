"strict mode"
console.log(a); // Outputs: undefined
var a = 5;
console.log(a); // Outputs: 5

//===================================================
foo(); // Outputs: "Hello"

function foo() {
    console.log("Hello");
}

//=====================================================
"strict mode"
var x = 5;
hoistExample();
function hoistExample() {
    console.log(x); // Outputs: undefined
    var x = 10;
    console.log(x); // Outputs: 10
}


console.log(x); // Outputs: 5

//===================================================


var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
];

var nextStudent = getStudentName(73);

console.log(nextStudent);

function getStudentName(studentID) {
    for (let student of students) {
        if (student.id == studentID) {
            return student.name;
        }
    }
}


