function calculator() {
    // TODO
    var charText = ''
    var previousResult = ''
    function splitText(charText, accu, numberText) {
        // console.log(`${charText}, accu: ${accu}, ${numberText}`)
        let [head, ...tail] = charText
        if (head === undefined) {
            return accu
        } else {
            if (head.match(/^[.0-9]/)) {
                return splitText(tail, accu, numberText + head)
            } else {
                accu.push(numberText, head)
                return splitText(tail, accu, '')
            }
        }
    }
    // console.log(splitText("4.19+89-1.66=", [], ''))

    function compute(charList, accu, opt) {
        let [head, ...tail] = charList
        // console.log(`head ${head}, accu: ${accu}`)
        if (head === undefined) {
            return accu
        } else {
            if (Number.isNaN(Number(head))) {
                return compute(tail, accu, head)
            } else {
                let ItemNumber = Number(head)
                if (accu === 0) {
                    return compute(tail, accu + ItemNumber, opt)
                } else {
                    switch (opt) {
                        case '+':
                            return compute(tail, accu + ItemNumber, '')
                            break
                        case '-':
                            return compute(tail, accu - ItemNumber, '')
                            break
                        case '*':
                            return compute(tail, accu * ItemNumber, '')
                            break
                        case '/':
                            return compute(tail, accu / ItemNumber, '')
                            break
                        default:
                            return compute(tail, accu, opt)
                    }
                }
            }
        }
    }
    // console.log(compute(['4.19', '+', '89', '-', '1.66', '='], 0, ''))
    return (function sequence(item) {
        if (item.match(/^[-+*/=.0-9]/)) {
            charText += item
            switch (item){
                case '=':
                    //compute the sequence
                    let splitArray = splitText(charText, [], '')
                    let [head, ...tail] = splitArray
                    
                    let offsetArray = (head === '') ? [previousResult, ...splitArray] : splitArray
                    // console.log(`${splitArray} ${offsetArray}`)
                    let result = compute(offsetArray, 0, '')
                    previousResult = result.toString()
                    charText = ''
                    return formatTotal(result)
                    break
                default:
                    return item
            }
        } else {
            return `invalid text: ${item}`
        }
    })
}

var calc = calculator();

console.log(calc("4"));     // 4
console.log(calc("+"));     // +
console.log(calc("7"));     // 7
console.log(calc("3"));     // 3
console.log(calc("-"));     // -
console.log(calc("2"));     // 2
console.log(calc("="));     // 75
console.log(calc("*"));     // *
console.log(calc("4"));     // 4
console.log(calc("="));     // 300
console.log(calc("5"));     // 5
console.log(calc("-"));     // -
console.log(calc("5"));     // 5
console.log(calc("="));     // 0

function useCalc(calc, keys) {
    return [...keys].reduce(
        function showDisplay(display, key) {
            var ret = String(calc(key));
            return (
                display +
                (
                    (ret != "" && key == "=") ?
                        "=" :
                        ""
                ) +
                ret
            );
        },
        ""
    );
}

console.log(useCalc(calc, "4+3="));           // 4+3=7
console.log(useCalc(calc, "+9="));            // +9=16
console.log(useCalc(calc, "*8="));            // *5=128
console.log(useCalc(calc, "7*2*3="));         // 7*2*3=42
console.log(useCalc(calc, "1/0="));           // 1/0=ERR
console.log(useCalc(calc, "+3="));            // +3=ERR
console.log(useCalc(calc, "51="));            // 51

function formatTotal(display) {
    if (Number.isFinite(display)) {
        // constrain display to max 11 chars
        let maxDigits = 11;
        // reserve space for "e+" notation?
        if (Math.abs(display) > 99999999999) {
            maxDigits -= 6;
        }
        // reserve space for "-"?
        if (display < 0) {
            maxDigits--;
        }

        // whole number?
        if (Number.isInteger(display)) {
            display = display
                .toPrecision(maxDigits)
                .replace(/\.0+$/, "");
        }
        // decimal
        else {
            // reserve space for "."
            maxDigits--;
            // reserve space for leading "0"?
            if (
                Math.abs(display) >= 0 &&
                Math.abs(display) < 1
            ) {
                maxDigits--;
            }
            display = display
                .toPrecision(maxDigits)
                .replace(/0+$/, "");
        }
    }
    else {
        display = "ERR";
    }
    return display;
}