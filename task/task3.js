let num = 10,
    obj1 = {value: "first value"},
    obj2 = {value: "second value"};

const obj3 = obj2;

((num, obj1, obj2) => {
    num = num * 10;
    obj1 = obj2;
    obj2.value = "new value";
})(num, obj1, obj2);

console.log(num);
// console.log(obj.value);
// console.log(obj2.value);
// console.log(obj3.value);