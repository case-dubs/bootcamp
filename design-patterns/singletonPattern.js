function createWorld(){
	var instance = this;
	console.log("this is a new instance");
	this.name = 'unique world';
	var d = new Date();
	this.created = d.getTime();
	createWorld = function(){
		//is there already an existing instance? 

		// if yes, then return the old one

		//if no, then use all of this stuff above to create a new instance and return that
		return instance;
	}
}

$(document).ready(function(){
	$('button').on('click', function(){

		var world1 = '';
		var world2 = '';
		if(this.id == 'createWorld'){
			world1 = new createWorld();
			console.log(world1);
		}
		else if(this.id == 'createAnother'){
			world2 = new createWorld();
			console.log(world2);
		}

	});
});