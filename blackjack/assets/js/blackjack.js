$(document).ready(function(){
	$('#btn-hit, #btn-stand').hide();
	if(initGame()){
		
		console.log("initGame() returns true");
		$('#btn-new').on('click', function(){
			newGame(2);
		});
		//Add an event handler for the ‘Hit’ button:
		$('#btn-hit').on('click', function(){
			//First, the event-handler should retrieve the playerHand array from local storage
			var playerHand = JSON.parse(localStorage.getItem('playerHand'));
			
			//It should then add another card object to the playerHand array by calling dealCard().
			playerHand.push(dealCard());
			
			//The playerHand array should then be saved back to local storage
			playerHand = JSON.stringify(playerHand);
			localStorage.setItem('playerHand', playerHand);
			//Finally, the player’s hand should be re-displayed.
			displayPlayerHand(); 
		});
	}
	else{
		console.log("initGame() returns false");
		$('#btn-new').prop("disabled");
	}


});

function initGame(){
	//create an empty array that will hold error messages
	var initErrors = [];
	//creat an empty error message variable
	var errorMessage = '';

	//if local storage is available
	if(Modernizr.localstorage){
		//and if Mustache is available
		if(Mustache){
			errorMessage = "Ready to play? Click 'New Game' to start...";
			return true;
		}
		//if Mustache isn't available
		else{
			initErrors.push('Mustache not available');
		}
	}
	//If local storage isn't available post post this 
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

function newGame(decks){
	getShoe(decks);
	//retrieve the shoe array from local storage and output it to the console.
	var localShoe = localStorage.getItem('shoe');

	//After the getShoe() function is called, the dealHands() function should be called.
	dealHands();
	//Next, the displayDealerHand() should be called and passed a boolean false value - to ensure that only one card is displayed face up.
	displayDealerHand(false);
	//Next, the displayPlayerHand() function should be called.
	displayPlayerHand();
	//Finally, the ‘Hit’ and ‘Stand’ buttons should be displayed.
	$('#btn-hit, #btn-stand').show();
	

}

//The function should accept a single parameter named ‘decks’. This will be passed an integer value that indicates how many decks are required for the shoe.
function getShoe(decks){
	//the function defines a new array named ‘shoe’.
	var shoe = [];
	for (var i=0; i<decks; i++){
		//adding a full deck of cards to the shoe array
		shoe = shoe.concat(getDeck());
		
	}
	console.log(shoe);
	//Once the shoe array has been created, but before it is saved to local storage, it should be passed to the shuffle() function.
	//The shuffled copy of the array that is returned should the be used to replace the original shoe array.
	shoe = shuffle(shoe);
	
	//convert shoe into a string in preparation for locally storing it
	shoe = JSON.stringify(shoe);
	//Once the shoe array has been created, it should be stored in local storage with a key of ‘shoe’.
	localStorage.setItem('shoe', shoe);
	
}


function shuffle(o) {

	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
		return o
};


function getDeck(){
	var deck = []

	function Card(suit, face){
		this.suit = suit;
		this.face = face; 
	}
	//Create deck. Genererate 52 card objects, that are added to the deck array
	for (var i=1; i<53; i++){
		//create an empty object for each card
		var card = new Card();
		var counter = 0;

		//Break up 52 card deck into 4 suits, each with 13 cards
		if (i<=13){
			//assign a suit of H to all cards in this batch
			card.suit = 'H';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = i;
			//push the card object into the deck array:
			deck.push(card);


		}
		else if (i > 13 && i < 26){
			//assign a suit of C to all cards in this batch
			card.suit = 'C';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = (i - 13);
			//push the card object into the deck array:
			deck.push(card);
		}
		else if (i >= 26 && i < 39){
			//assign a suit of D to all cards in this batch
			card.suit = 'D';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = (i - 25);
			//push the card object into the deck array:
			deck.push(card);
		}
		else if (i >= 39){
			//assign a suit of S to all cards in this batch
			card.suit = 'S';
			//a counter starting a 0 that goes up by one each time the if statement is iterated
			card.face = (i - 38);
			//push the card object into the deck array:
			deck.push(card);
		}

	}

	//return the cards 
	return deck;
}

function dealCard(){
	//retrieve the shoe array from local storage and assigned to a local variable
	var localShoe = localStorage.getItem('shoe');
	localShoe = JSON.parse(localShoe);

	//The first element in the array should be removed by using the JavaScript splice() function.
	var card = localShoe.splice(0,1);
	localShoe = JSON.stringify(localShoe);
	localStorage.setItem('shoe', localShoe);

	//The value that is returned by the splice() function should be assigned to a variable named ‘card’. This should now contain a single array element that holds a card object.
		//Retrieve the element from the array and assign it back to the card variable. The card variable should now contain the object itself.
	card = card[0];
	console.log(card);
	var suit = card.suit;
	//make suit lowercase in order to match the naming of the .png card image
	suit = suit.toLowerCase();
	
	var face = card.face;
	var cardValue;
	//All cards with a numeric ‘face’ property will have a value that is the same as the property’s value.
	if (face <11){
		cardValue = face;
	}
	//Jacks, Queens and Kings all have a value of 10.
	else{
		cardValue = 10;
	}
	console.log(cardValue);

	//make suit two digit number in order to match the naming of the .png card image
	face = ("0" + face).slice(-2);

	var cardImage = suit + face + ".png";
	console.log(cardImage);

	//the function should create and return an object:
	var cardObject = new Object();
	cardObject.image = cardImage;
	cardObject.value = cardValue;
	return cardObject;

}


function dealHands(){

	//This should be assigned with an array of two elements.
	var dealerHand = [];
	//Each element should be created by calling the dealCard() function.
	dealerHand[0] = dealCard();
	dealerHand[1] = dealCard();

	var playerHand = [];
	playerHand[0] = dealCard();
	playerHand[1] = dealCard();
	
	//Each of these arrays should then be saved to local storage, using the name of the array as the key.
	dealerHand = JSON.stringify(dealerHand);
	localStorage.setItem('dealerHand', dealerHand);

	playerHand = JSON.stringify(playerHand);
	localStorage.setItem('playerHand', playerHand);

}

function displayDealerHand(reveal){

	var dealerHand = localStorage.getItem('dealerHand');
	dealerHand = JSON.parse(dealerHand);
	console.log(dealerHand);
	
	//the passed-in parameter should be tested:
	if(reveal){

		var hand = new Object();
		hand.cards = [dealerHand[0], dealerHand[1]];
		console.log(hand);
		var template = $('#tpl-hand').html();
		var html = Mustache.render(template, hand);
		$('#dealer-hand').append(html);
	}
	else{
		var hand = new Object();
		hand.cards = [dealerHand[0]];
		hand.back = true;
		console.log(hand);
		var template = $('#tpl-hand').html();
		var html = Mustache.render(template, hand);
		$('#dealer-hand').append(html);


	}

}

function displayPlayerHand(){
	//First, the playerHand array should be retrieved from local storage. This should be assigned to a variable named ‘hand’.
	var playerHand = localStorage.getItem('playerHand');
	playerHand = JSON.parse(playerHand);
	var hand = new Object();
	hand.cards = [playerHand[0], playerHand[1]];

	console.log(hand);

	//The hand variable should then be used to render the ‘tpl-hand’ template.
	var template = $('#tpl-hand').html();
	var html = Mustache.render(template, hand);
	//The resulting output should be used to populate the div with an id of ‘player-hand’.
	$('#player-hand').append(html);

}
