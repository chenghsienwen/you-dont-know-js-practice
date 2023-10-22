function Animal(name) {
    this.name = name;
}

Animal.prototype.sayHello = function () {
    console.log(`Hello, I'm ${this.name}`);
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
    console.log("Woof woof!");
};

const myDog = new Dog("Buddy", "Golden Retriever");

myDog.sayHello(); // Outputs: Hello, I'm Buddy
myDog.bark(); // Outputs: Woof woof!

const a1 = new Animal("Buddy2");

a1.sayHello(); // Outputs: Hello, I'm Buddy2
// a1.bark(); //TypeError: a1.bark is not a function