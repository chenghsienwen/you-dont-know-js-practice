function takeLastN(arr, n) {
    return [...arr.slice(-n)];
}

console.log(takeLastN([1, 2, 3], 2))