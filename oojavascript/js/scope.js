$(document).ready(function(){

	var firstName = 'Casey';
	function sayHi(){
		var fname = "Mark";
		var relation = "Coding Partner";
		var hello = fname + " is my " + relation + ".</p><p> 'Hey, " + fname + ". How was your weekend?'";
		$('p').after("<p>" + hello + "</p>");

	}

	$('h1').after("<p>Hi, my name is " + firstName + "</p>");
	sayHi();	

	$('#show').click(function(){
		console.log(window.fname);
	});

	console.log("Hi, my name is " + fname + " " + lname);

});