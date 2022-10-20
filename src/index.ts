
//tuples
// let user: [number, string] = [1, 'Kyro'];
// user[0].   //get method of that type
// user.push(2);  //gap


//Enums
// const small = 1;
// const medium = 2;
// const large = 3;

// enum Size {Small = 0, Medium = 'm', Large = 'l'};
// let mySize : Size = Size.Medium;
// console.log(mySize);


//functions
// function calculateTex(income: number, taxYear?: number): number{ //noUnusedParameters
//   if((taxYear || 2022) < 2022){ // or give it default value taxYear = 2022
//     return income * 1.2;
//   }
//   return income * 1.3; // noImplicitReturns
// }

// calculateTex(10_00); // noUnusedLocals


//object
// let employee: {
//   readonly id: number,
//   name: string,
//   retire: (date: Date) => void;
// } = { 
//   id: 1,
//   name: "",
//   retire: (date: Date) => {
//     console.log(date);
//   }
// };   //or name?: string
// employee.name = 'Kyro';
// employee.id = 2;



//advanced types

//type aliases
// type Employee = {
//   readonly id: number,
//   name: string,
//   retire: (date: Date) => void;
// }

// let employee: Employee = { 
//   id: 1,
//   name: "",
//   retire: (date: Date) => {
//     console.log(date);
//   }
// }; 


//union type
// function kgToLbs(weight: number | string): number{
//   //Narrowing
//   if(typeof weight === 'number'){
//     return weight * 2.2;
//   }else{
//     return parseInt(weight) * 2.2;
//   }
// }

// kgToLbs(10);
// kgToLbs('10kg')


//intersection type => combine type
// type Draggable = {
//   drag: () => void;
// }

// type Resizable = {
//   resize: () => void;
// }

// type UTWidget = Draggable & Resizable;

// let textBox: UTWidget = {
//   drag: () => {},
//   resize: () => {}
// }


//Literal types
//Literal (exact, specific)
type Quantity = 50 | 100;
let quantity: Quantity = 100;

type Metric = 'cm' | 'inch';


//Nullable types
function greet(name: string | null | undefined) {  //strictNullChecks
  if(name)
    console.log(name.toUpperCase());
  else  
    console.log('hola');
}

greet(null)


//optional chaining
type Customer = {
  birthday?: Date
}

function getCustomer(id: number): Customer | null | undefined{
  return id === 0 ? null : { birthday: new Date()}
}

let customer = getCustomer(0);
// if(customer !== null && customer !== undefined)
  // console.log(customer.birthday);
  console.log(customer?.birthday?.getFullYear())

  // optional element access operator
  // let log: any = null;
  // log?.('a');


//Nullish Coaelscing Operator
let speed: number | null = null;
let ride = {
  //if speed is not null or undefined use 30 as value
  speed: speed ?? 30  //0 can not be ignored
}


//type Assertions


//the unknow type
function render(document: unknown){
  //if we use any, it does not provide type checking
  // document.move();
  // document.fly();
  // Narrowing
  if(typeof document === 'string'){
    document.toUpperCase();
  }
}


//the never type
function processEvents(): never{
  while(true){
    // read a messag from queue

  }
}

// processEvents();
// console.log('hello') // never be executed, we can add never type      allowUnreachableCode:true



// Classes, interfaces and Object-oriented Programming
class Account {
  // readonly id: number;   //those will not shown in js file
  // owner: string;
  // private _balance: number;
  nickname?: string;

  // constructor(id: number, owner: string, _balance: number){
    constructor(
      public readonly id: number,  //parameter properties
      public owner: string, 
      private _balance: number
    ){
    // this.id = id;
    // this.owner = owner;
    // this._balance = _balance;
  }

  deposit(amount: number): void {
    if(amount <= 0){
      throw new Error("Invalid amount");
    }
    this._balance += amount;
  }

  // getBalance() : number {
  //   return this._balance;
  // }

  get balance(): number{
    return this._balance;
  }

  set balance(value: number) {
    if(value < 0){
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
class SeatAssignment{
  //index signature property
   [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = "kyro";
seats.A2 = "Bob";
seats['A3'] = "Mimi";


//static members
class Ride {
  private static _activeRides: number = 0;

  // start() { this.activeRides ++ }
  // stop() { this.activeRides -- }
  start() { Ride._activeRides ++ }
  stop() { Ride._activeRides -- }

  static get activeRides(){
    return Ride._activeRides;
  }
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

// console.log(ride1.activeRides)
// console.log(ride2.activeRides) //different memory space

// console.log(Ride.activeRides);


//inheritance && method overriding
class Person{
  //private property can not be inheritance but protected property can inheritance. both of them can not be access from outside
  constructor(public firstName: string, public lastName: string){}

  get fullName(){
    return this.firstName + " " + this.lastName;
  }

  protected walk(){
    console.log("walking");
  }
}

class Student extends Person {
  constructor(public studentId: number, firstName: string, lastName: string){
    super(firstName, lastName);
  }

  takeTest(){
    console.log('Taking a test');
  }
}

// let student = new Student(1, 'John', 'john@gmail.com');

class Teacher extends Person {
  override get fullName(){   // noImplicitOverride
    return "Professor" + " " + super.fullName;
  }
}

let teacher = new Teacher('Lisa','Smith');
console.log(teacher.fullName)

class Principal extends Person {
  override get fullName(): string {
      return "Principal " + super.fullName; 
  }
}

printNames([
  new Student(1, 'John', "Smith"),
  new Teacher("Kyro", "Hamedani"),
  new Principal("Mary", "Lala")
])

//Polymorphism
function printNames(people: Person[]){  //open closed principle
  for(let person of people){
    console.log(person.fullName);
  }
}


//abstract
abstract class Shape {   
  constructor(public color: string){

  }
  abstract render(): void;
}

class Circle extends Shape{
  constructor(public radius: number, color: string){
    super(color);
  }

  override render(): void {
    console.log('Rendering a circle');
  }

}

// let shape = new Shape('red');
// shape.render(); // what does it mean?


//interface
// abstract class Calendar {
//   constructor(public name: string){}

//   abstract addEvent(): void;
//   abstract removeEvent(): void;
// }

interface Calendar {    //use interface to describe the shape of class
  name: string;
  addEvent(): void;
  removeEvent(): void;
}

interface CloudCalendar extends Calendar{
  sync(): void;
}

// type Test ={
//   name: string;
// }

// class Test1 implements Test{
//   constructor(public name: string){}
// }

class GoogleCalendar implements Calendar { //command + >
  constructor(public name: string){}
  addEvent(): void {
    throw new Error("Method not implemented.");
  }
  removeEvent(): void {
    throw new Error("Method not implemented.");
  }

}



//Generics
//Generic class
class KeyValuePair<K, V> {
  constructor(public key: K, public value: V){}
}
let pair = new KeyValuePair<number, string>(1, 'a')  // new KeyValuePair<string, string>('11','a');


//generic function
class ArrayUtils{
  static wrapInArray<T>(value: T){
    return [value];
  }
}
let numbers = ArrayUtils.wrapInArray('1');


//generic interface
interface Result<T> {
  data: T | null,
  error: string | null
}

function fetch<T>(url: string): Result<T> {
  return {data: null, error: null};
}

interface User {
  username: string
}

// interface Product {
//   title: string
// }

let result = fetch<User>('url');
// result.data?.username


//Generic constraints
function echo<T extends {name: string}>(value: T): T{
  return value;
}

echo({name: 'a'});


//Generic classes
interface Product{
  name: string;
  price: number;
}
//The keyof Operator
class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }

  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find(obj => obj[property] === value);
  }
}

// let store = new Store<Product>();
// store.add({name: 'a', price: 1});
// store.find({'name': 'a'});
// store.find({'price', 1});

// Pass on the generic type parameter
class CompressibleStore<T> extends Store<T> {
  compress(){}
}

let store = new CompressibleStore<Product>();
// Restrict the generic type parameter
// class SearchableStore<T extends {name: string}> extends Store<T> {
//   find(name: string): T | undefined{
//     return this._objects.find(obj => obj.name === name);
//   }
// }
// Fix the generic type parameter
class ProductStore extends Store<Product>{
  filterByCategory(category: string): Product[] {
    return [];
  }
} 


//Tap mapping
interface Product{
  name: string;
  price: number;
}

type ReadOnly<T> = {
  //Index signature
  //keyof
  readonly [K in keyof T]: T[K]
}

let product1: ReadOnly<Product> = {
  name: 'a',
  price: 1
}



//Decorators
function Component(constructor: Function){
  console.log('Component decorator called');
  constructor.prototype.uniqueId = Date.now();
  constructor.prototype.insertInDOM = () => {
    console.log('Inserting the component in the DOM');
  }
}

@Component
class ProfileComponent{

}











