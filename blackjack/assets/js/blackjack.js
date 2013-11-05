$(document).ready(function(){
	$('#btn-hit, #btn-stand').hide();
	if(initGame()){
		console.log("initGame() returns true");
		$('#btn-new').on('click', function(){
			getDeck();
		});
	}
	else{
		console.log("initGame() returns false");
		$('#btn-new').prop("disabled");
	}


});

function initGame(){
	var initErrors = [];
	var errorMessage = '';

	if(Modernizr.localstorage){
		if(Mustache){
			errorMessage = "Ready to play? Click 'New Game' to start...";
			return true;
		}
		else{
			initErrors.push('Mustache not available');
		}
	}
	else{
		initErrors.push("Local storage not available");
		
	}

	if(initErrors.length > 0){
		errorMessage = "Houston, we have a problem" 
		if (initErrors.length == 1) {
			errorMessage += ' (' + initErrors[0] + ').';
		} 
		else if (initErrors.length == 2){
			errorMessage += ' (' + initErrors[0] + ", " + initErrors[1] + ').';
		}
		return false;
	}

	displayStatusMessage(errorMessage);
}

function displayStatusMessage(msg){

	$('#status p').text(msg);
	
}

function newGame(){
	getShoe();
}

function getShoe(){

}
var deck = []

function getDeck(){
	function Card(suit, face){
		this.suit = suit;
		this.face = face;
	}
	//Create deck. Genererate 52 card objects, that are added to the deck array
	for (i=0; i<52; i++){
		//create an empty object for each card
		var card = new Card();
		var counter = 0;

		//Break up 52 card deck into 4 suits, each with 13 cards
		if (i<13){
			//assign a suit of H to all cards in this batch
			card.suit = 'H';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = i + 1;
			//push the card object into the deck array:
			deck.push(card);


		}
		else if (i > 12 && i < 25){
			//assign a suit of C to all cards in this batch
			card.suit = 'C';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = (i - 12);
			//push the card object into the deck array:
			deck.push(card);
		}
		else if (i > 25 && i < 38){
			//assign a suit of D to all cards in this batch
			card.suit = 'D';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = (i - 25);
			//push the card object into the deck array:
			deck.push(card);
		}
		else if (i > 38){
			//assign a suit of S to all cards in this batch
			card.suit = 'S';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = (i - 38);
			//push the card object into the deck array:
			deck.push(card);
		}

	}

	console.log(deck);
}