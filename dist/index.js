"use strict";
//tuples
// let user: [number, string] = [1, 'Kyro'];
// user[0].   //get method of that type
// user.push(2);  //gap
var _a;
let quantity = 100;
//Nullable types
function greet(name) {
    if (name)
        console.log(name.toUpperCase());
    else
        console.log('hola');
}
greet(null);
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
// if(customer !== null && customer !== undefined)
// console.log(customer.birthday);
console.log((_a = customer === null || customer === void 0 ? void 0 : customer.birthday) === null || _a === void 0 ? void 0 : _a.getFullYear());
// optional element access operator
// let log: any = null;
// log?.('a');
//Nullish Coaelscing Operator
let speed = null;
let ride = {
    //if speed is not null or undefined use 30 as value
    speed: speed !== null && speed !== void 0 ? speed : 30 //0 can not be ignored
};
//type Assertions
//the unknow type
function render(document) {
    //if we use any, it does not provide type checking
    // document.move();
    // document.fly();
    // Narrowing
    if (typeof document === 'string') {
        document.toUpperCase();
    }
}
//the never type
function processEvents() {
    while (true) {
        // read a messag from queue
    }
}
// processEvents();
// console.log('hello') // never be executed, we can add never type      allowUnreachableCode:true
// Classes, interfaces and Object-oriented Programming
class Account {
    // constructor(id: number, owner: string, _balance: number){
    constructor(id, //parameter properties
    owner, _balance) {
        this.id = id;
        this.owner = owner;
        this._balance = _balance;
        // this.id = id;
        // this.owner = owner;
        // this._balance = _balance;
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Invalid amount");
        }
        this._balance += amount;
    }
    // getBalance() : number {
    //   return this._balance;
    // }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        if (value < 0) {
            throw new Error('Invalid value');
        }
        this._balance = value;
    }
}
let account = new Account(1, 'kyro', 0);
account.deposit(100);
// console.log(account.balance);
// console.log(account.getBalance());
//index signatures
class SeatAssignment {
}
let seats = new SeatAssignment();
seats.A1 = "kyro";
seats.A2 = "Bob";
seats['A3'] = "Mimi";
//static members
class Ride {
    // start() { this.activeRides ++ }
    // stop() { this.activeRides -- }
    start() { Ride._activeRides++; }
    stop() { Ride._activeRides--; }
    static get activeRides() {
        return Ride._activeRides;
    }
}
Ride._activeRides = 0;
let ride1 = new Ride();
ride1.start();
let ride2 = new Ride();
ride2.start();
// console.log(ride1.activeRides)
// console.log(ride2.activeRides) //different memory space
// console.log(Ride.activeRides);
//inheritance && method overriding
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return this.firstName + " " + this.lastName;
    }
    walk() {
        console.log("walking");
    }
}
class Student extends Person {
    constructor(studentId, firstName, lastName) {
        super(firstName, lastName);
        this.studentId = studentId;
    }
    takeTest() {
        console.log('Taking a test');
    }
}
// let student = new Student(1, 'John', 'john@gmail.com');
class Teacher extends Person {
    get fullName() {
        return "Professor" + " " + super.fullName;
    }
}
let teacher = new Teacher('Lisa', 'Smith');
console.log(teacher.fullName);
class Principal extends Person {
    get fullName() {
        return "Principal " + super.fullName;
    }
}
printNames([
    new Student(1, 'John', "Smith"),
    new Teacher("Kyro", "Hamedani"),
    new Principal("Mary", "Lala")
]);
//Polymorphism
function printNames(people) {
    for (let person of people) {
        console.log(person.fullName);
    }
}
