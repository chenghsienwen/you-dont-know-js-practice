anotherObj = {
    42: "<-- this property name will be treated as an integer",
    "41": "<-- ...and so will this one",

    true: "<-- this property name will be treated as a string",
    [myObj]: "<-- ...and so will this one"
};

//===========================================
anotherObj = {
    ["x" + (21 * 2)]: true
};
//would be: { x42: true }

//===========================================
myPropSymbol = Symbol("optional, developer-friendly description");

anotherObj = {
    [myPropSymbol]: "Hello, symbol!"
};
// {
//     [Symbol(optional, developer - friendly description)]: 'Hello, symbol!'
// }

//==========================================
coolFact = "the first person convicted of speeding was going 8 mph";

anotherObj = {
    coolFact: coolFact
};
// { coolFact: 'the first person convicted of speeding was going 8 mph' }

anotherObj = {
    coolFact   // <-- concise property short-hand
};
// { coolFact: 'the first person convicted of speeding was going 8 mph' }

//=======================================
anotherObj = {
    // standard function property
    greet: function () { console.log("Hello!"); },

    // concise function/method property
    greet2() { console.log("Hello, friend!"); },

    // instead of:
    //   greet3: function*() { yield "Hello, everyone!"; }

    // concise generator method
    *greet3() { yield "Hello, everyone!"; }
};

//Object Spread==============================
anotherObj = {
    favoriteNumber: 12,

    ...myObj,   // object spread, shallow copies `myObj`

    greeting: "Hello!"
}//later name would override previous name
//shallow copy vs deep copy: Object.assign(..)

//===========================================
myObj = {
    favoriteNumber: 42,
    isDeveloper: true,
    firstName: "Kyle"
};

Object.entries(myObj);
// [ ["favoriteNumber",42], ["isDeveloper",true], ["firstName","Kyle"] ]

myObjShallowCopy = Object.fromEntries(Object.entries(myObj));

// alternate approach to the earlier discussed:
// myObjShallowCopy = { ...myObj };

//optional chaining: (in ES2020)
myObj?.address?.city
//is the same with
    (myObj != null && myObj.address != null) ? myObj.address.city : undefined
//Don't pretend that ?.( is doing that for you, or future
//===========================================================
//boxing", as in putting a value inside a "box" (object container).
fave = 42;

fave;              // 42
fave.toString();   // "42"
//===========================================
// shallow copy all (owned and enumerable) properties
// from `myObj` into `anotherObj`
Object.assign(anotherObj, myObj);

Object.assign(
    /*target=*/anotherObj,
    /*source1=*/{
        someProp: "some value",
        anotherProp: 1001,
    },
    /*source2=*/{
        yetAnotherProp: false
    }
);

//Deleting Properties=================================================
anotherObj = {
    counter: 123
};

anotherObj.counter;   // 123

delete anotherObj.counter;

anotherObj.counter;   // undefined

//Object.hasOwn(..): it's invoked as a static helper external to the object value instead of via the object's [[Prototype]] => it's safer
//hasOwnProperty(..): only consults the target object.
//in xxx:  The in operator will check not only the target object specified, but if not found there, it will also consult the object's [[Prototype]] chain


//==============================
myObj = {
    favoriteNumber: 42,
    isDeveloper: true,
    firstName: "Kyle"
};

Object.getOwnPropertyDescriptor(myObj, "favoriteNumber");
// {
//     value: 42,
//     enumerable: true,
//     writable: true,
//     configurable: true
// }

anotherObj = {};

Object.defineProperty(anotherObj, "fave", {
    value: 42,
    enumerable: true,     // default if omitted
    writable: true,       // default if omitted
    configurable: true    // default if omitted
});

anotherObj.fave;          // 42

//array
myList = [23, 42, 109];

myList[0];      // 23
myList[1];      // 42

// "2" works as an integer index here, but it's not advised
myList["2"];    // 109

//array Empty Slots
myList = [23, 42, 109];
myList.length;              // 3
//don't do this: ever intentionally create empty slots in your arrays
myList[14] = "Hello";
myList.length;              // 15

myList;                     // [ 23, 42, 109, empty x 11, "Hello" ]

// looks like a real slot with a
// real `undefined` value in it,
// but beware, it's a trick!
myList[9];                  // undefined

//function examples
function help(opt1, opt2, ...remainingOpts) {
    // ..
}

help.name;          // "help"
help.length;        // 2

//Object Characteristics
// extensible: whether an object can have new properties defined/added to it, default is true
myObj = {
    favoriteNumber: 42
};

myObj.firstName = "Kyle";                  // works fine

Object.preventExtensions(myObj);

myObj.nicknames = ["getify", "ydkjs"];   // fails
myObj.favoriteNumber = 123;                // works fine
// sealed
//TODO
// frozen
//TODO

// prototype chain
myObj = {
    favoriteNumber: 42
};
//due to DELEGATING
myObj.toString();                             // "[object Object]"

myObj.hasOwnProperty("favoriteNumber");   // true

//since ES2022
// This form is now considered the more preferable and robust option,
//     and the instance method(hasOwnProperty(..)) form should now generally be avoided.
Object.hasOwn(myObj, "favoriteNumber");   // true

//Empty [[Prototype]] Linkage
emptyObj = Object.create(null);
// or: emptyObj = { __proto__: null }

emptyObj.toString;   // undefined

//[[Prototype]] vs prototype
// prototype property on a function doesn't define any linkage that the function itself
// functions(as objects) have their own internal[[Prototype]] linkage somewhere else

//class: Inside a class block, all code runs in strict-mode even without the "use strict" pragma
//instance add properties would not affect others instance

//Class Instance this
class Point2d {
    constructor(x, y) {
        // add properties to the current instance
        this.x = x;
        this.y = y;
    }
    toString() {
        // access the properties from the current instance
        console.log(`(${this.x},${this.y})`);
    }
}

var point = new Point2d(3, 4);

point.x;                // 3
point.y;                // 4

point.toString();       // (3,4)

//public fields=====================================================
class Point2d {
    // these are public fields
    x = 0
    y = 0

    constructor(x, y) {
        // set properties (fields) on the current instance
        this.x = x;
        this.y = y;
    }
    toString() {
        // access the properties from the current instance
        console.log(`(${this.x},${this.y})`);
    }
}
//field names can be computed:
var coordName = "x";

class Point2d {
    // computed public field
    [coordName.toUpperCase()] = 42

    // ..
}

var point = new Point2d(3, 4);

point.x;        // 3
point.y;        // 4

point.X;        // 42

//anti pattern example====================================
class Point2d {
    x = null
    y = null
    getDoubleX = () => this.x * 2

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() { /* .. */ }
}

var point = new Point2d(3, 4);

point.getDoubleX();    // 6

Object.hasOwn(point, "x");               // true -- good
Object.hasOwn(point, "toString");        // false -- good
Object.hasOwn(point, "getDoubleX");      // true -- oops :(
// => By defining a function value and attaching it as a field / member property, 
//we're losing the shared prototypal method'ness of the function

// never attach an => arrow function as an instance property in place of a dynamic prototypal class method

//class extension=========================
class Point2d {
    x = 3
    y = 4

    getX() {
        return this.x;
    }
}

class Point3d extends Point2d {
    x = 21
    y = 10
    z = 5

    printDoubleX() {
        console.log(`double x: ${this.getX() * 2}`);
    }
}

var point = new Point2d();

point.getX();                   // 3

var anotherPoint = new Point3d();

anotherPoint.getX();            // 21
anotherPoint.printDoubleX();    // double x: 42

//you want to access an inherited method from a subclass even if it's been overridden, you can use super instead of this:
class Point2d {
    x = 3
    y = 4

    getX() {
        return this.x;
    }
}

class Point3d extends Point2d {
    x = 21
    y = 10
    z = 5

    getX() {
        return this.x * 2;
    }
    printX() {
        console.log(`x: ${super.getX()}`);
    }
}

var point = new Point3d();

point.printX();       // x: 21

//new.target syntax====================================
class Point2d {
    // ..

    constructor(x, y) {
        if (new.target === Point2) {
            console.log("Constructing 'Point2d' instance");
        }
    }

    // ..
}

class Point3d extends Point2d {
    // ..

    constructor(x, y, z) {
        super(x, y);

        if (new.target === Point3d) {
            console.log("Constructing 'Point3d' instance");
        }
    }

    // ..
}

var point = new Point2d(3, 4);
// Constructing 'Point2d' instance

var anotherPoint = new Point3d(3, 4, 5);
// Constructing 'Point3d' instance

//instanceof example
class Point2d { /* .. */ }
class Point3d extends Point2d { /* .. */ }

var point = new Point2d(3, 4);

point instanceof Point2d;           // true
point instanceof Point3d;           // false

var anotherPoint = new Point3d(3, 4, 5);

anotherPoint instanceof Point2d;    // true
anotherPoint instanceof Point3d;    // true

//check constructor for specific class, not from prototype chain
point.constructor === Point2d;          // true
point.constructor === Point3d;          // false

anotherPoint.constructor === Point2d;   // false
anotherPoint.constructor === Point3d;   // true

//"Inheritance" Is Sharing, Not Copying==================

//static in class example==============================
class Point2d {
    // class statics
    static origin = new Point2d(0, 0)
    static distance(point1, point2) {
        return Math.sqrt(
            ((point2.x - point1.x) ** 2) +
            ((point2.y - point1.y) ** 2)
        );
    }

    // instance members and methods
    x
    y
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
}

console.log(`Starting point: ${Point2d.origin}`);
// Starting point: (0,0)

var next = new Point2d(3, 4);
console.log(`Next point: ${next}`);
// Next point: (3,4)

console.log(`Distance: ${Point2d.distance(Point2d.origin, next)
    }`);
// Distance: 5

//static block since ES2022
class Point2d {
    // class statics
    static origin = new Point2d(0, 0)
    static distance(point1, point2) {
        return Math.sqrt(
            ((point2.x - point1.x) ** 2) +
            ((point2.y - point1.y) ** 2)
        );
    }

    // static initialization block (as of ES2022)
    static {
    let outerPoint = new Point2d(6, 8);
    this.maxDistance = this.distance(
        this.origin,
        outerPoint
    );
}

    // ..
}

Point2d.maxDistance;        // 10

//static inheritance example
class Point2d {
    static origin = /* .. */
        static distance(x, y) { /* .. */ }

    static {
    // ..
    this.maxDistance = /* .. */;
}

    // ..
}

class Point3d extends Point2d {
    // class statics
    static origin = new Point3d(
        // here, `this.origin` references wouldn't
        // work (self-referential), so we use
        // `super.origin` references instead
        super.origin.x, super.origin.y, 0
    )
    static distance(point1, point2) {
        // here, super.distance(..) is Point2d.distance(..),
        // if we needed to invoke it

        return Math.sqrt(
            ((point2.x - point1.x) ** 2) +
            ((point2.y - point1.y) ** 2) +
            ((point2.z - point1.z) ** 2)
        );
    }

    // instance members/methods
    z
    constructor(x, y, z) {
        super(x, y);     // <-- don't forget this line!
        this.z = z;
    }
    toString() {
        return `(${this.x},${this.y},${this.z})`;
    }
}

Point2d.maxDistance;        // 10
Point3d.maxDistance;        // 10

//Private Class Behavior=========================
class Point2d {
    // statics
    static samePoint(point1, point2) {
        return point1.#ID === point2.#ID;
    }

    // privates
    #ID = null
    #assignID() {
        this.#ID = Math.round(Math.random() * 1e9);
    }

    // publics
    x
    y
    constructor(x, y) {
        this.#assignID();
        this.x = x;
        this.y = y;
    }
}

var one = new Point2d(3, 4);
var two = new Point2d(3, 4);

Point2d.samePoint(one, two);         // false
Point2d.samePoint(one, one);         // true

//ergonomic brand check
class Point2d {
    // statics
    static samePoint(point1, point2) {
        // "ergonomic brand checks"
        if (#ID in point1 && #ID in point2) {
            return point1.#ID === point2.#ID;
        }
        return false;
    }

    // privates
    #ID = null
    #assignID() {
        this.#ID = Math.round(Math.random() * 1e9);
    }

    // publics
    x
    y
    constructor(x, y) {
        this.#assignID();
        this.x = x;
        this.y = y;
    }
}

var one = new Point2d(3, 4);
var two = new Point2d(3, 4);

Point2d.samePoint(one, two);         // false
Point2d.samePoint(one, one);         // true

//Exfiltration==========================
var id, func;

class Point2d {
    // privates
    #ID = null
    #assignID() {
        this.#ID = Math.round(Math.random() * 1e9);
    }

    // publics
    x
    y
    constructor(x, y) {
        this.#assignID();
        this.x = x;
        this.y = y;

        // exfiltration
        id = this.#ID;
        func = this.#assignID;
    }
}

var point = new Point2d(3, 4);

id;                     // 7392851012 (...for example)

func;                   // function #assignID() { .. }
func.call(point, 42);

func.call({}, 100);
// TypeError: Cannot write private member #ID to an
// object whose class did not declare it

//Private Statics example================================
class Point2d {
    static #errorMsg = "Out of bounds."
    static #printError() {
        console.log(`Error: ${this.#errorMsg}`);
    }

    // publics
    x
    y
    constructor(x, y) {
        if (x > 100 || y > 100) {
            Point2d.#printError();
        }
        this.x = x;
        this.y = y;
    }
}

var one = new Point2d(30, 400);
// Error: Out of bounds.

//fix example
//from
class Point2d {
    static #errorMsg = "Out of bounds."
    static printError() {
        console.log(`Error: ${this.#errorMsg}`);
    }

    // ..
}

class Point3d extends Point2d {
    // ..
}

Point2d.printError();
// Error: Out of bounds.

Point3d.printError === Point2d.printError;
// true

Point3d.printError();
// TypeError: Cannot read private member #errorMsg
// from an object whose class did not declare it
//==========================================================
//to: modify this.#errorMsg to Point2d.#errorMsg
class Point2d {
    static #errorMsg = "Out of bounds."
    static printError() {
        // the fixed reference vvvvvv
        console.log(`Error: ${Point2d.#errorMsg}`);
    }

    // ..
}

class Point3d extends Point2d {
    // ..
}

Point2d.printError();
// Error: Out of bounds.

Point3d.printError();
// Error: Out of bounds.  <-- phew, it works now!
