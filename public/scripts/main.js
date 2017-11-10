class Person {
    constructor (name) {
        this.name = name;
    }
    hello() {
        if (typeof this.name === 'string') {
            return 'hello, i am ' + this.name + '!'
        }else{
            return "Hello";
        }
    }
}

var person = new Person('Thor');
var name = 'Korg';

document.write(person.hello());