myName = "Kyle";

myName.nickname = "getify";

typeof myName.nickname //undefined, silently fail

console.log(myName.nickname);           // undefined

//use strict mode to avoid silently fail

//Primitives are values that are not allowed to have properties; only objects are allowed

"hello".length //5 due to auto boxing

//tricky part of null
typeof null;            // "object", due to legacy

typeof undefined;               // "undefined"

var whatever;

typeof whatever;                // "undefined"
typeof nonExistent;             // "undefined"

whatever = {};
typeof whatever.missingProp;    // "undefined"

whatever = [];
typeof whatever[10];            // "undefined"

// ?? (nullish-coalescing) operator:===================================
who = myName ?? "User";

// equivalent to:
who = (myName != null) ? myName : "User";

//?. (nullish conditional-chaining) operator:==========================
let record = {
    shippingAddress: {
        street: "123 JS Lane",
        city: "Browserville",
        state: "XY"
    }
};

console.log(record?.shippingAddress?.street);
// 123 JS Lane

console.log(record?.billingAddress?.street);
// undefined


//avoid this syntax================================================
//It's only checking to make sure the value is non-nullish before trying to invoke it. 
//f it's some other non-nullish but also non-function value type, the execution attempt will still fail with a TypeError exception.
// instead of:
//   if (someFunc) someFunc(42);
//
// or:
//   someFunc && someFunc(42);

someFunc?.(42);
//================================================
//null and undifined is different========================
function greet(msg = "Hello") {
    console.log(msg);
}

greet();            // Hello
greet(undefined);   // Hello
greet("Hi");        // Hi

greet(null);        // null

//string escape sample
myTitle = "Kyle Simpson (aka, \"getify\"), former O'Reilly author";

console.log(myTitle);
// Kyle Simpson (aka, "getify"), former O'Reilly author

//================================================
windowsFontsPath =
    "C:\\Windows\\Fonts\\";

console.log(windowsFontsPath);
// C:\Windows\Fonts\"

//obfuscated hexadecimal representation:
"a" === "\x61";             // true

//unicode example
eTilde1 = "é";
eTilde2 = "\u00e9";
eTilde3 = "\u0065\u0301";

console.log(eTilde1);       // é
console.log(eTilde2);       // é
console.log(eTilde3);       // é

eTilde1.length;             // 2
eTilde2.length;             // 1
eTilde3.length;             // 2

eTilde1 === eTilde2;        // false
eTilde1 === eTilde3;        // true

"é" === "é";           // false!!

eTilde1 = "é";
eTilde2 = "\u{e9}";
eTilde3 = "\u{65}\u{301}";

eTilde1.normalize("NFC") === eTilde2; //true
eTilde2.normalize("NFD") === eTilde3; //true

//This kind of complexity significantly affects length computations, 
//comparison, sorting, and many other common string - oriented operations.

//Number Values tricky parts==========================
Number.isInteger(42);           // true
Number.isInteger(42.0);         // true
Number.isInteger(42.000000);    // true

Number.isInteger(42.0000001);   // false

//parsing-conversion vs coercive-conversion.================
someNumericText = "123.456";

parseInt(someNumericText, 10);               // 123
parseFloat(someNumericText);                // 123.456

parseInt("42", 10) === parseFloat("42");     // true

parseInt("512px");                          // 512

//coercive-conversion is an all-or-nothing sort of operation.
someNumericText = "123.456";

Number(someNumericText);        // 123.456
+someNumericText;               // 123.456

Number("512px");                // NaN
+"512px";                       // NaN

//=============================================
someBigPowerOf10 = 1_000_000_000;

totalCostInPennies = 123_45;  // vs 12_345

//number limit
Number.MAX_VALUE;           // 1.7976931348623157e+308

Number.MAX_VALUE === (Number.MAX_VALUE + 1);
// true -- oops!

Number.MAX_VALUE === (Number.MAX_VALUE + 10000000);
// true

//===============================================
Number.isFinite(Number.MAX_VALUE);  // true

Number.isFinite(Infinity);          // false
Number.isFinite(-Infinity);         // false

Number.MAX_VALUE + 1E291;           // 1.7976931348623157e+308
Number.MAX_VALUE + 1E292;           // Infinity

Number.MAX_VALUE * 1.0000000001;    // Infinity

1 / 1E-308;                         // 1e+308
1 / 1E-309;                         // Infinity

Number.MIN_VALUE;               // 5e-324 <-- usually!

//==============================================
maxInt = Number.MAX_SAFE_INTEGER;

maxInt;             // 9007199254740991

maxInt + 1;         // 9007199254740992

maxInt + 2;         // 9007199254740992

Number.isSafeInteger(2 ** 53);      // false
Number.isSafeInteger(2 ** 53 - 1);  // true

//=============================================
function isNegZero(v) {
    return v == 0 && (1 / v) == -Infinity;
}

regZero = 0 / 1;
negZero = 0 / -1;

regZero === negZero;        // true -- oops!
Object.is(-0, regZero);      // false -- phew!
Object.is(-0, negZero);      // true

isNegZero(regZero);         // false
isNegZero(negZero);         // true

//Invalid Number=================================
42 / "Kyle";            // NaN

myAge = Number("just a number");

myAge;                  // NaN

+undefined;             // NaN

//NaN is a special value in JS, in that it's the only value in the language that lacks the identity property -- it's never equal to itself.
NaN === NaN;            // false

politicianIQ = "nothing" / Infinity;

Number.isNaN(politicianIQ);         // true

Object.is(NaN, politicianIQ);        // true
[NaN].includes(politicianIQ);     // true

//big integer
myAge = 42n;        // this is a bigint, not a number

myKidsAge = 11;     // this is a number, not a bigint

myAge = 42n;

inc = 1;

myAge += BigInt(inc);

myAge;              // 43n

//Symbol Values=================================
secret = Symbol("my secret");
//the Symbol(..) function must be called without the new keyword.

//Well-Known Symbols (WKS)=====================
myInfo = {
    // ..
};

String(myInfo);         // [object Object]

myInfo[Symbol.toStringTag] = "my-info";
String(myInfo);         // [object my-info]

//Global Symbol Registry==============================================
// retrieve if already registered,
// otherwise register
PRIVATE_ID = Symbol.for("private-id");

// elsewhere:

privateIDKey = Symbol.keyFor(PRIVATE_ID);
privateIDKey;           // "private-id"

// elsewhere:

// retrieve symbol from registry undeer
// specified key
privateIDSymbol = Symbol.for(privateIDKey);
//======================================
//const doesn't create immutable values, it declares variables that cannot be reassigned

//Additionally, properties cannot be added to any primitive values:
greeting = "Hello.";

greeting.isRendered = true;

greeting.isRendered;        // undefined

//symbol iterator example
myName = "Kyle";
it = myName[Symbol.iterator]();

it.next();      // { value: "K", done: false }
it.next();      // { value: "y", done: false }
it.next();      // { value: "l", done: false }
it.next();      // { value: "e", done: false }
it.next();      // { value: undefined, done: true }

//string array length: string always counts the number of code-units in the string value, not code-points
favoriteItem = "teléfono";
favoriteItem.length;            // 9 -- uh oh!

favoriteItem = favoriteItem.normalize("NFC");
favoriteItem.length;            // 8 -- phew!

//example 2
// "☎" === "\u260E"
oldTelephone = "☎";
oldTelephone.length;            // 1

// "📱" === "\u{1F4F1}" === "\uD83D\uDCF1"
cellphone = "📱";
cellphone.length;               // 2 -- oops!

//example 3=================================================
cellphone = "📱";
cellphone.length;               // 2 -- oops!
[...cellphone].length;        // 1 -- phew!

//string compare
"my name" === "my n\x61me";               // true

"my name" !== String.raw`my n\x61me`;     // true

//Really Strict Equality
Object.is("42", 42);             // false

Object.is("42", "\x34\x32");     // true

//Like ==, the < and > operators are numerically coercive.
// the < and > have no strict-comparison equivalent,

//use localeCompare(..) when sorting an array of strings:
studentNames = [
    "Lisa",
    "Kyle",
    "Jason"
];

// Array::sort() mutates the array in place
studentNames.sort(function alphabetizeNames(name1, name2) {
    return name1.localeCompare(name2);
});

studentNames;
// [ "Jason", "Kyle", "Lisa" ]

//use Intl.Collator directly is more performant
studentNames = [
    "Lisa",
    "Kyle",
    "Jason"
];

nameSorter = new Intl.Collator("en");

// Array::sort() mutates the array in place
studentNames.sort(nameSorter.compare);

studentNames;
// [ "Jason", "Kyle", "Lisa" ]

//Floating Point Imprecision
point3a = 0.1 + 0.2;
point3b = 0.3;

point3a;                        // 0.30000000000000004
point3b;                        // 0.3

point3a === point3b;            // false <-- oops!

//fix it by EPSILON
function safeNumberEquals(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}

point3a = 0.1 + 0.2;
point3b = 0.3;

// are these safely "equal"?
safeNumberEquals(point3a, point3b);      // true

//however, it still be issue
point3a = 10.1 + 0.2;
point3b = 10.3;

safeNumberEquals(point3a, point3b);      // false :(

//equals examples
NaN === NaN;                // false -- ugh!
-0 === 0;                   // true -- ugh!

41 < 42;                    // true

0.1 + 0.2 > 0.3;            // true (ugh, IEEE-754)

40 + 2;                 // 42
44 - 2;                 // 42
21 * 2;                 // 42
84 / 2;                 // 42
7 ** 2;                 // 49
49 % 2;                 // 1

40 + "2";               // "402" (string concatenation)
44 - "2";               // 42 (because "2" is coerced to 2)
21 * "2";               // 42 (..ditto..)
84 / "2";               // 42 (..ditto..)
"7" ** "2";             // 49 (both operands are coerced to numbers)
"49" % "2";             // 1 (..ditto..)

//Bitwise Operators
...
//BigInts and Numbers Don't Mix
myAge = 42n;

myAge + 1;                  // TypeError thrown!
myAge += 1;                 // TypeError thrown!

//==============================================
BigInt(42);                 // 42n

Number(42n);                // 42

myAge + 1n;                 // 43n
myAge += 1n;                // 43n

myAge++;
myAge;                      // 44n
