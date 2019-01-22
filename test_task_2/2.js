function calcFactorial2(n, maxTime) {

    const startTime = Date.now();
    function fn(num) {
        if (!num) return 1;
        const diff = Date.now() - startTime;
        if (diff > maxTime) {
            throw Error('Shif on me: it takes too long ...')
        }
        return num * fn(num - 1);
    }
    console.log('startTime', startTime);
    return fn(num);
}

try {
    console.log('calcFactorial', calcFactorial(100000, 1));
} catch (e) {
    alert(e.message)
}

const calcFactorial1 = (n, t) => {
    if (n == 0) return 0;
    if (n == 1) return 1;

    let result = 1;
    let start = Date.now();
    for (i = 1; i <= n; i++) {
        let end = Date.now();
        if ((end - start) > t) {
            throw Error('Shif on me: it takes too long ...')
        } else {
            result *= i;
        }
    }

    return result;
};