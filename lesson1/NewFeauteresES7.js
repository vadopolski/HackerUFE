let number = [1, 2, 4];

// ES6
if (number.indexOf(2) != -1)
    console.log('Arrays contains val', 2);

// ES7
if (number.includes(2))
    console.log('Arrays contains val', 2);

// до ES7
var b = Math.pow(2, 5);
console.log(b);

// ES7
const c = 2**5;
console.log(c);

const ob = {
    c : {
        bb : 'vapa'
    }
};

if (ob && ob.c && ob.c.bb)
    console.log('Test');

if (ob?.c?.bb)
    console.log('Test');

