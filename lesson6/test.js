class MyClass {
    constructor(fName, lName, age) {
        this.fname = fName;
        this.lName = lName;
        this.age = age;
    }

    get fullName() {
        return this.fname + ',' + this.lName;
    }

    set fullName(newValue) {
        [this.fname, this.lName] = newValue.split(' ');
    }

    static workFields() {
        return 'This is work fields.';
    }

    get parents() {
        return this.parentsName;
    }

    set parents(parentsName) {
        this.parentsName = parentsName;
    }

    sayHello() {
        console.log('This is ' + this.name + ' age ' + this.age + ', parents ' + (this.parentsName ? this.parentsName : 'empty'));
    }
}

class SecondClass extends MyClass {
    constructor(name, institute) {
        super(name, '', 0);
        this.fname = name;
        this.institute = institute;
    }

    sayHello() {
        super.sayHello();
        console.log('I\'m from' + this.institute);
    }
}


function myFuncName(name, age) {
    this.name = name;
    this.age = age;
}

myFuncName.prototype.sayHello = function () {
    console.log('This is ' + this.name + ' age ' + this.age);
};


const myClassInstance = new MyClass('Miroslava', 'Petrova', 10);
myClassInstance.parents = 'Ivan Petrovich and Natalia';
myClassInstance.fullName = 'Miroslava Petrova';

console.log(myClassInstance.name + ' ' + myClassInstance.age);
console.log(myClassInstance.sayHello());
console.log(myClassInstance.fullName);
console.log(MyClass.workFields());
console.log(SecondClass.workFields());

const myFuncInstance = new myFuncName('Michaela', 30);
myFuncInstance.sayHello();

const secondClass = new SecondClass();
console.log(secondClass.sayHello());