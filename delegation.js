

//factory function example===============================
// a non-class "constructor"
function Point2d(x, y) {
    // create an object (1)
    var instance = {};

    // initialize the instance (3)
    instance.x = x;
    instance.y = y;

    // return the instance (4)
    return instance;
}

var point = Point2d(3, 4);

point.x;                    // 3
point.y;                    // 4

//=======================================
// What operations does Object.create(..) perform ?

// 1. create a brand new empty object, out of thin air.

// 2. link the[[Prototype]] of that new empty object to the function's .prototype object.

//How does it compare to the class approach?
var Point2d = {
    init(x, y) {
        this.x = x;
        this.y = y;
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

var point = Object.create(Point2d);

point.init(3, 4);

point.toString();           // (3,4)

//Delegation Illustrated=======================
var Coordinates = {
    setX(x) {
        this.x = x;
    },
    setY(y) {
        this.y = y;
    },
    setXY(x, y) {
        this.setX(x);
        this.setY(y);
    },
};

var Inspect = {
    toString() {
        return `(${this.x},${this.y})`;
    },
};

var point = {};

Coordinates.setXY.call(point, 3, 4); //throw Uncaught TypeError in strict mode
Inspect.toString.call(point);         // (3,4), throw Uncaught TypeError in strict mode

var anotherPoint = Object.create(Coordinates);

anotherPoint.setXY(5, 6);
Inspect.toString.call(anotherPoint);  // (5,6)




