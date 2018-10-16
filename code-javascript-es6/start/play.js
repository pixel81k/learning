let aGreatNumber = 10;
if (true) {
    let aGreatNumber = 30;
    (() => {
        let aGreatNumber = 42;
    })

}

setTimeout(() => {
    console.log(aGreatNumber);
}, 250);
console.log('waiting...');