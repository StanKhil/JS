// class MyClass1{
//     x = 10;
//     #y = 20;
//     get y(){
//         return this.#y;
//     }

//     set y(value){
//         this.#y = value;
//     }

//     getX(){
//         return window.x;
//     }

//     constructor() {
//         this.a = a || "A";
//     }
// }

// const myObj1 = new MyClass1("AA");
// const myObj2 = new MyClass1();
// myObj2.x = 100;
// myObj1.b = "B";

// console.log(myObj1.x); 
// console.log(myObj1.y); 
// console.log(myObj1.a); 
// console.log(myObj1.b);

// MyClass1.prototype.fun1 = () => {
//     return "My x = " + this.x;
// }
// MyClass1.prototype.fun2 = function() {
//     return "My x = " + this.x;
// }
// window.x = 20;
// console.log(myObj1.fun2()); 
// console.log(myObj2.fun2()); 

class Component1{
    name;
    price;
    rating;

    constructor(name, price, rating) {
        this.name = name || "Default Name";
        this.price = price || 0;
        this.rating = rating || 0;
    }

    toHtml() {
        return `<div class="product">
                    <h2>${this.name}</h2>
                    <p>Price: $${this.price}</p>
                    <p>${
                        (rating=> "★".repeat(rating) + "☆".repeat(5 - rating))(this.rating)
                    }</p>
                </div>`;
    }
}

const products = [
    new Component1("Pencil", 15.50, 5),
    new Component1("Pen", 16.99, 4.0),
    new Component1("Rubber", 10, 3),
    new Component1("Notebook", 25),
];

const container = document.getElementById("container");
if(!container) throw new Error("Container element not found");

for(let product of products){
    container.innerHTML += product.toHtml();
}