function foo() {
    console.log(this.a);
}

var obj = {
    a: 2
};
var a = "oops, global"; // `a` also property on global object

foo.call(obj); // 2 