for(var A=0; A < 2; A++){

    let B = A;
    const C = B;
    setTimeout( function () {
        console.log('A: ' + A);
        console.log('B: ' + B);
        console.log('C: ' + C);
        console.log('')
        }, 1)
}