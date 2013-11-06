function VehicleFactory(){
	this.enginetype = 'hybrid';
	this.color = 'green';

};

VehicleFactory.factory = function(type){
	var type = type;
	var vehicle;
	VehicleFactory[type].prototype = new VehicleFactory();
	vehicle = new VehicleFactory[type]();
	return vehicle;
}

VehicleFactory.Car = function(){
	this.wheels = 4;
	this.doors = 5;
	this.maxspeed = 100;
}

VehicleFactory.Bike = function(){
	this.wheels = 2;
	this.doors = 0;
	this.maxspeed = 120;
}

$(document).ready(function(){
	$('#buildCar').on('click', function(){
		var myCar = VehicleFactory.factory('Car');
		console.log(myCar);
	});

	$('#buildBike').on('click', function(){
		var myBike = VehicleFactory.factory('Bike');
		console.log(myBike);
	});
});

//var myCar = new VehicleFactory.factory('Car');
//var myBike = new VehicleFactory.factory('Bike');

//console.log(myCar);
//console.log(myBike);