//the determination of what value (usually, object) this points at is not made at author time, but rather determined at runtime.
//When the function is invoked a certain way, what this will be assigned for that invocation?
//4 ways of this invocation

//'this' is an implicit parameter

//example1
'use strict'
var point = {
    x: null,
    y: null,

    init(x, y) {
        this.x = x;
        this.y = y;
    },
    rotate(angleRadians) {
        var rotatedX = this.x * Math.cos(angleRadians) -
            this.y * Math.sin(angleRadians);
        var rotatedY = this.x * Math.sin(angleRadians) +
            this.y * Math.cos(angleRadians);
        this.x = rotatedX;
        this.y = rotatedY;
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

//case1: default invocation
point.init(3, 4);

//case2: should throw TypeError in strict mode
const init = point.init;
init(3, 4);
// TypeError: Cannot set properties of
// undefined (setting 'x')

//=============================================
// no strict-mode here, beware!

var point = { /* .. */ };

const init = point.init;
init(3, 4);

globalThis.x;   // 3
globalThis.y;   // 4
point.x;        // null
point.y;        // null

//Explicit Context Invocation==========================
var point = { /* .. */ };

const init = point.init;

init.call(point, 3, 4);
// or: init.apply( point, [ 3, 4 ] )

point.x;        // 3
point.y;        // 4

//dynamic reference of 'this'==========================
var point = {
    x: null,
    y: null,

    init(x, y) {
        this.x = x;
        this.y = y;
    },
    rotate(angleRadians) { /* .. */ },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

point.init(3, 4);

var anotherPoint = {};
point.init.call(anotherPoint, 5, 6); //borrow function of init

point.x;                // 3
point.y;                // 4
anotherPoint.x;         // 5
anotherPoint.y;         // 6

//Implicit Context Invocation: verbose of borrow function=============================
var point = { /* .. */ };

var anotherPoint = {
    init: point.init,
    rotate: point.rotate,
    toString: point.toString,
};

anotherPoint.init(5, 6);

anotherPoint.x;         // 5
anotherPoint.y;         // 6
//prefer to use explicit context assignment with call(..) / apply(..)

//'new' keyword Context Invocation
var point = {
    // ..

    init: function () { /* .. */ } //need to called with 'new' keyword

    // ..
};

var anotherPoint = new point.init(3, 4);

anotherPoint.x;     // 3
anotherPoint.y;     // 4

//4 special steps that JS performs when a function is invoked with new=============
// 1. create a brand new empty object, out of thin air.

// 2. link the[[Prototype]] of that new empty object to the function's .prototype object (see Chapter 2).

// 3. invoke the function with the this context set to that new empty object.

// 4. if the function doesn't return its own object value explicitly (with a return .. statement), assume the function call should instead return the new object (from steps 1-3).

//so the above code is the same with following
// alternative to:
//   var anotherPoint = new point.init(3,4)

var anotherPoint;
// this is a bare block to hide local
// `let` declarations
{
    // (Step 1)
    let tmpObj = {};

    // (Step 2)
    Object.setPrototypeOf(
        tmpObj, point.init.prototype
    );
    // or: tmpObj.__proto__ = point.init.prototype

    // (Step 3)
    let res = point.init.call(tmpObj, 3, 4);

    // (Step 4)
    anotherPoint = (
        typeof res !== "object" ? tmpObj : res
    );
}

//sum up: explicit vs 'new'
var point = { /* .. */ };

// this approach:
var anotherPoint = {};
point.init.call(anotherPoint, 5, 6); //prefer this way

// can instead be approximated as:
var yetAnotherPoint = new point.init(5, 6);//new is creating a new object

//==========================================================
//'this' context assignment in function calls
// 1. Is the function invoked with new, creating and setting a new this: context is new created object 

// 2. Is the function invoked with call(..) or apply(..), explicitly setting this: context from explicit call

// 3. Is the function invoked with an object reference at the call - site(e.g., point.init(..)), implicitly setting this 
//example, context is obj2=================
function foo() {
    console.log(this.a);
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42
//====================

// 4. If none of the above...are we in non - strict mode ? If so, default the this to globalThis.But if in strict - mode, default the this to undefined.

// store a fixed reference to the current
// `this` context
var context = this;

this.submitBtn.addEventListener(
    "click",
    function handler(evt) {
        return context.clickHandler(evt);
    },
    false
);

//In an => function, the this keyword... is not a keyword==============
//When a this is encountered (this.value) inside an => arrow function, this is treated like a normal lexical variable, not a special keyword.
// So, innerFn.call(two) is invoking inner(), but when inner() looks up a value for this, it gets... one, not two.
function outer() {
    console.log(this.value);

    // define a return an "inner"
    // function
    var inner = () => {
        console.log(this.value);
    };

    return inner;
}

var one = {
    value: 42,
};
var two = {
    value: "sad face",
};

var innerFn = outer.call(one);
// 42

innerFn.call(two);
// 42   <-- not "sad face"

// The primary point of the => function being added to JS was to give us "lexical this" behavior
globalThis.value = { result: "Sad face" };

function one() {
    function two() {
        var three = {
            value: { result: "Hmmm" },

            fn: () => {
                const four = () => this.value;
                return four.call({
                    value: { result: "OK", },
                });
            },
        };
        return three.fn();
    };
    return two();
}

new one();          // ??? => globalThis

// four |
//     three.fn |
//     two | (this = globalThis)
// one | (this = {})
// [global] | (this = globalThis)


//The bind(..) utility defines a new wrapped/bound version of a function, where its this is preset and fixed
this.submitBtn.addEventListener(
    "click",
    this.clickHandler.bind(this),
    false
);

//hard bind example==================================
// candidate implementation, for comparison
function fakeBind(fn, context) {
    return (...args) => fn.apply(context, args);
}

// test subject
function thisAwareFn() {
    console.log(`Value: ${this.value}`);
}

// control data
var obj = {
    value: 42,
};

// experiment
var f = thisAwareFn.bind(obj);
var g = fakeBind(thisAwareFn, obj);

f();            // Value: 42
g();            // Value: 42

new f();        // Value: undefined
new g();        // <--- ??? => throw exception 
//because an => function cannot be used with the new keyword.
//an => arrow function is not a syntactic form of bind(this)

//Pre-Binding Function Contexts==============================
//prefered code: without 'this'
// the most straightforward and even performant solution, is lexical variables and scope closure.
function Point2d(px, py) {
    var x = px;
    var y = py;

    return {
        getDoubleX() { return x * 2; },
        toString() { return `(${x},${y})`; }
    };
}

var point = Point2d(3, 4);
var anotherPoint = Point2d(5, 6);

var f = point.getDoubleX;
var g = anotherPoint.toString;

f();            // 6
g();            // (5,6)