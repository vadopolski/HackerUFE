let myObj = {};

const handleCheck = () => {
    const p = document.getElementById("app");
    p.innerHTML = typeof myObj;
};

const handleClearValue = () => {
    const def = 'data goes here.';
    const p = document.getElementById('app');
    p.innerHTML = def;
};

const ob2 = {a: 0, d: 5};
const ob1 = {a: 5, b: 2, c: 45};

// const obj3 = Object.assign(ob1, ob2);
// let obj6 = Object.assign(ob2, ob1);

// console.log(obj3);
// console.log(obj6);

let obj4 = {... ob2, ... ob1};
let obj5 = {... ob1, ... ob2};

// console.log(obj4);
// console.log(obj5);


let ob6 = {c : 1, b: 2, a: 45};
// ES6
let {a = 555, b, c, f = 'no data'} = ob6;

console.log(ob6);

// import ES5
let myModule = a: 555, myFunc: function f1() {};
module.export = myModule;




// ES6
export default myModule;
export myModule;

// import {Fn1 , Fn2} from '...';
// import myPsedo, {Fn3} from '...';

//import * as CONSTANTS from '..file_path';

// ПЕРЕМЕННЫЕ
// ES5
var variableName = 1;
var obj = {};

//ES6
const variableName1 = 5;
const variableName2 = 6;
let obj1 = {};



