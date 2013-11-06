// Here, we're declaring a constructor called Vehicle.  Capital V === constructor
function Vehicle(color) {
    this.color = color;
};

// We assign a function to Vehicle's prototype
Vehicle.prototype = {
    respray: function(newColor) { this.color = newColor; }
};

// Same constructor deal that we've seen before.
function Car(seats) {
    this.seats = seats;
    this.speed = 0;
}

// Vehicle.prototype is still the same object we created above:
console.log(Vehicle.prototype);

// We can assign that prototype to any other variable.  In this case, Car.prototype
Car.prototype = Vehicle.prototype;

// Now they're the same
console.log(Vehicle.prototype, Car.prototype);

// We can still modify properties of Car.prototype (just be careful to not overwrite the whole thing)
Car.prototype.accelerate = function() { this.speed += 10; };