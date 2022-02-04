function range(start, endOpt = null) {
    // ..TODO..
    function rangeCury(end) {
        let length = Math.max(end - start + 1, 0)
        return Array.from({ length: length }, (_, i) => i + start)
    }
    if (typeof endOpt == "number")
        return rangeCury(endOpt)
    else
        return rangeCury   
}

console.log(range(3, 3));    // [3]
console.log(range(3, 8));    // [3,4,5,6,7,8]
console.log(range(3, 0));    // []

var start3 = range(3);
var start4 = range(4);

console.log(start3(3));     // [3]
console.log(start3(8));     // [3,4,5,6,7,8]
console.log(start3(0));     // []

console.log(start4(6));     // [4,5,6]