const theGlobalScopeObject =
    (typeof globalThis != "undefined") ? globalThis :
        (typeof global != "undefined") ? global :
            // (typeof window != "undefined") ? window :
                (typeof self != "undefined") ? self :
                (new Function("return this"))();
console.log(theGlobalScopeObject)