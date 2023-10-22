// ToBoolean() is abstract

ToBoolean(undefined);               // false
ToBoolean(null);                    // false
ToBoolean("");                      // false
ToBoolean(0);                       // false
ToBoolean(-0);                      // false
ToBoolean(0n);                      // false
ToBoolean(NaN);                     // false
//Simple rule: any other value that's not in the above list is truthy and coerces via ToBoolean() to true:
ToBoolean("hello");                 // true
ToBoolean(42);                      // true
ToBoolean([1, 2, 3]);             // true
ToBoolean({ a: 1 });                // true

//ToPrimitive example
// ToPrimitive() is abstract

ToPrimitive({ a: 1 }, "string");          // "[object Object]"

ToPrimitive({ a: 1 }, "number");          // NaN

//ToString example
// ToString() is abstract

ToString(42.0);                 // "42"
ToString(-3);                   // "-3"
ToString(Infinity);             // "Infinity"
ToString(NaN);                  // "NaN"
ToString(42n);                  // "42"

ToString(true);                 // "true"
ToString(false);                // "false"

ToString(null);                 // "null"
ToString(undefined);            // "undefined"

ToString(Symbol("ok"));         // TypeError exception thrown

//ToNumber example
// ToNumber() is abstract

ToNumber("42");                     // 42
ToNumber("-3");                     // -3
ToNumber("1.2300");                 // 1.23
ToNumber("   8.0    ");             // 8

ToNumber("123px");                  // NaN
ToNumber("hello");                  // NaN

ToNumber(true);                     // 1
ToNumber(false);                    // 0

ToNumber(null);                     // 0
ToNumber(undefined);                // NaN

ToNumber("");                       // 0
ToNumber("       ");                // 0

ToNumber(42n);                      // TypeError exception thrown
ToNumber(Symbol("42"));             // TypeError exception thrown

//tricky boolean
nope = new Boolean(false);
Boolean(nope);                  // true   <--- oops!
!!nope;                         // true   <--- oops!

//Equality
Object.is(42, 42);                   // true
Object.is(-0, -0);                   // true
Object.is(NaN, NaN);                 // true

Object.is(0, -0);                    // false

//tricky 
[1, 2, -0].includes(0);           // true  <--- oops!

(new Set([1, 2, 0])).has(-0);     // true  <--- ugh

(new Map([[0, "ok"]])).has(-0);   // true  <--- :(

[1, 2, NaN].indexOf(NaN);         // -1  <--- not found

vals = [0, 1, 2, -0, NaN];

vals.find(v => Object.is(v, -0));            // -0
vals.find(v => Object.is(v, NaN));           // NaN

vals.findIndex(v => Object.is(v, -0));       // 3
vals.findIndex(v => Object.is(v, NaN));      // 4

//Remember: when the types of the two == operands are not the same, it prefers to coerce them both to numbers.
// (1)
"yes" == true //false

// (2)
"yes" == 1 //false

// (3)
NaN == 1 //false

// (4)
NaN === 1           // false

//string true case
// (1)
"true" == true //false

// (2)
"true" == 1 //false

// (3)
NaN == 1 //false

// (4)
NaN === 1           // false

//What if isLoggedIn was holding the number 1? 
// (1)
1 == true //true

// (2)
1 == 1 //true

// (3)
1 === 1             // true

//if isLoggedIn was instead holding the string "1"? 
// (1)
"1" == true //true

// (2)
"1" == 1 //true

// (3)
1 == 1 //true

// (4)
1 === 1             // true

//[] is a truthy value, but it's also coercively equal to false?! Ouch.
[] == false //true,  oops...

//Tips: activating ToBoolean(), such as if (isLoggedIn), and stay away from the == / === forms.

//Strings corner case
String([1, 2, 3]);                // "1,2,3"

String([]);                         // ""

String([null, undefined]);        // ","

String({});                         // "[object Object]"

String({ a: 1 });                   // "[object Object]"

//Numbers corner case
Number("");                         // 0
Number("       ");                  // 0

Number([]);                         // 0

Number("NaN");                      // NaN  <--- accidental!

Number("Infinity");                 // Infinity
Number("infinity");                 // NaN  <--- oops, watch case!

Number(false);                      // 0
Number(true);                       // 1

//Coercion Absurdity
[] == ![];                          // true

[] == ![]
[] == false
"" == false
0 == false
0 == 0
0 === 0 //-> true

// Let's restate/summarize what we know about == and === so far:

// 1. If the types of the operands for == match, it behaves exactly the same as ===.

// 2. If the types of the operands for === do not match, it will always return false.

// 3. If the types of the operands for == do not match, it will allow coercion of either
// operand(generally preferring numeric type - values), until the types finally match; once they match, see(1).