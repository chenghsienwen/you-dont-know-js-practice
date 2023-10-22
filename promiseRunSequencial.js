const a = callback => {
    setTimeout(() => { callback('a'); }, 500);
};

const b = callback => {
    setTimeout(() => { callback('b'); }, 200);
};

const c = callback => {
    setTimeout(() => { callback('c'); }, 300);
};
//question: how to run a,b,c sequentially
// const doByOrder = async (callback) => {
//   a(callback);
//   b(callback);
//   c(callback);
// }

const doByOrder = async (callback) => {
    const ap1 = () => new Promise((resolve, reject) => {
        a(i => {
            console.log(`run ${i}`);
            resolve();
        })
    })

    const ap2 = () => new Promise((resolve, reject) => {
        b(i => {
            console.log(`run ${i}`);
            resolve();
        })
    })

    const ap3 = () => new Promise((resolve, reject) => {
        c(i => {
            console.log(`run ${i}`);
            resolve();
        })
    })

await ap1()
await ap2()
await ap3()
}

// Call the function to execute sequentially
doByOrder().then(() => {
    console.log("All tasks completed.");
});