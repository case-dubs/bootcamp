$(document).ready(function(){

	$(this).on('click', 'button', function(){
		var buttonId = this.id;
		console.log(buttonId);
		if(buttonId == 'buildCar'){
			console.log("in build car()");
			buildCar();

		}
		else if(buttonId == 'buildBike'){
			buildBike();
		}
		else if (buttonId == 'accelerate'){
			myCar.accelerate();
			$('#carSpeed').text(myCar.speed);
		}
		else if (buttonId == 'accelerateBike'){
			myBike.accelerate();
			$('#bikeSpeed').text(myBike.speed);
			console.log(myBike.speed)
		}
		else if (buttonId == 'decelerate'){
			myCar.decelerate();
			$('#carSpeed').text(myCar.speed);
		}
		else if (buttonId == 'decelerateBike'){
			myBike.decelerate();
			$('#bikeSpeed').text(myBike.speed);
		}
		else if (buttonId == 'stop'){
			myCar.stop();
			$('#carSpeed').text(myCar.speed);
		}
		else if (buttonId == 'stopBike'){
			myBike.stop();
			$('#bikeSpeed').text(myBike.speed);
		}
		else if (buttonId == 'respray'){
			myCar.respray(''+ $('#color').val()+ '');
			$('#carColor').text(myCar.color);
		}
		else if (buttonId == 'resprayBike'){
			myBike.color = $('#bikeColorDropdown').val();
			console.log(myBike.color);
			$('#bikeColor').text(myBike.color);
		}
	});

	//var manufacturer = $('#manufacturer').val();
	//var color = $('#color').val();
	//var doors = $('input:radio').val();

	var myCar = '';

	function buildCar(){
		var manufacturer = $('#manufacturer').val();
		var color = $('#color').val();
		var doors = $('input[type=radio]:checked').val();
		console.log(doors);
		var maxspeed = 100;
		myCar = new Vehicle(manufacturer, color, maxspeed);
		$('body').append('<h2> My Car Details</h2>');
		$('h2').after('<table><thead><tr><th>Property</th><th>Value</th></thead><tbody><tr><td>Manufacturer</td><td>' + myCar.manufacturer + '</td></tr><tr><td>Color</td><td id="carColor">' + myCar.color + '</td></tr><tr><td>Speed</td><td id="carSpeed">' + myCar.speed + '</td></tr>tr><td>Speed</td><td id="maxSpeed">' + myCar.maxspeed + '</td></tr></tbody></table>');
	}

	function buildBike(){
		var manufacturer = $('#bikeManufacturer').val();
		var color = $('#bikeColorDropdown').val();
		var maxspeed = 150;
		myBike = new Vehicle(manufacturer, color, maxspeed);
		console.log(myBike.speed);
		$('body').append('<h2> My Car Details</h2>');
		$('h2').after('<table><thead><tr><th>Property</th><th>Value</th></thead><tbody><tr><td>Manufacturer</td><td>' + myBike.manufacturer + '</td></tr><tr><td>Color</td><td id="bikeColor">' + myBike.color + '</td></tr><tr><td>Speed</td><td id="bikeSpeed">' + myBike.speed + '</td></tr>tr><td>Max Speed</td><td id="maxSpeed">' + myBike.maxspeed + '</td></tr></tbody></table>');
	}

});



function Vehicle(manufacturer, color, maxspeed) {
	this.color =  color;
	this.manufacturer = manufacturer;
	this.speed = 0;
	this.maxspeed = maxspeed;
}

Vehicle.prototype = {
	accelerate: function(){
		if (this.speed < this.maxspeed){
			this.speed += 10;
		}
	},

	decelerate: function(){
		if (this.speed > 0){
			this.speed -= 10;
		}
	},
	stop: function (){
		this.speed = 0;
	},
	respray: function (){
		this.color = $('#color').val();
	}
}