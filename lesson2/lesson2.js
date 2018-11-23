function myFirstFunction() {
    var localMessage = arguments[0] + ` say Hello World`;
    console.log(localMessage);
    return localMessage

}

const copyOfMyFunction = myFirstFunction;

var secondFunction = function (value) {
  myFirstFunction(value);
};


var thirdFunction = function thirdFunction(value) {
  myFirstFunction(value);
};

copyOfMyFunction(`Vasiliy`);
myFirstFunction(`Alina`);
secondFunction('Vadim');
thirdFunction(`Test`);

