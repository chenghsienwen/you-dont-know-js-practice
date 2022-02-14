function toggle(...item) {
    // TODO
    var index = 0
    let length = item.length
    return function iterator() {
        var result = item[index % length]
        index++
        return result
    }
}

var hello = toggle("hello");
var onOff = toggle("on", "off");
var speed = toggle("slow", "medium", "fast");
var empty = toggle()

console.log(empty())
console.log(hello());      // "hello"
console.log(hello());      // "hello"

console.log(onOff());      // "on"
console.log(onOff());      // "off"
console.log(onOff());      // "on"

console.log(speed());      // "slow"
console.log(speed());      // "medium"
console.log(speed());      // "fast"
console.log(speed());      // "slow"