//When the document is ready, create the empty table
$(document).ready(function() {

	
	//When somebody clicks the submit button, get the URLs and load-parse-save
	$("#submit").on('click',function(){
		
		
		
		
		//The url to GET the xml from
		var urlGet = $("#input").val();
		
		
		
		//This ajax call gets the .xml
		$.ajax({
			url: urlGet + '.xml',//The url plus '.xml'
			dataType: 'xml',//It's an xml...
			success: function(myData){
				//Parse through the data
				myData = parseXML(myData);
				
				
				
				
				/*
				 * DO YOUR CODE RIGHT HERE WHILE YOU HAVE THE DATA
				 */
				
				
				
				
				
			},// myData is deleted right here
			error: function(xhr, text, errorScript){
				//If there was an error, print that out
				console.log("FAILURE");
				console.log(text);
				console.log(errorScript);
			}
		});
	});
	
	
	
	
	
	//This function goes through the data and parses it and returns the parsed json
	function parseXML(data){
		
		
		//Get the table element from the xml
		var table = $($(data).find("Table")[0]);
		
		
		
		//Create a variable to push the data into
		var allData = {
			people: {
				
			}
		};
		
		
		
		//Iterate through all the rows EXCEPT for the top 2, because they're populated with the titles of the columns
		for(var indexRow = 2; indexRow < table.find("Row").length; indexRow++){
			
			//Get the current row as an object we can play with
			var tmpRow = $(table.find("Row")[indexRow]);
			
			//The variable to hold the current entry
			var tmpEntry = {
				date: '',
				time: '',
				activityOverall: '',
				activityNarrow: '',
				people: '',
				aliveness: -1.0,
				concentration: -1.0,
				clarity: -1.0,
				anxiety: -1.0,
				notes: ''
			};
			
			
			//If the length is less than 3 elements, it hasn't been populated correctly
			if(tmpRow.find("Data").length < 3){
				//Data has not been filled in all the way. Probably just name and empty date
				continue; //Skip this for loop, goes to the next iteration.
			}
			
			
			
			////Get the name of the person who the entry belongs to
			var tmpName = $(tmpRow.find("Data")[0]).text();
			
			//Check if we don't have the person in the data
			if(allData.people[tmpName] == undefined){
				
				
				//Log that we are going to create data for the new person and their name
				console.log("New person: " + tmpName);
				
				//Create an object for the person and set it into the data under their name
				allData.people[tmpName] = {
					name: tmpName,//The name
					data: {},//Their misc data (NOT entries, and not being populated)
					entries: []//The entries
				};
			}
			
			
			//For all of the elements in the row.....
			for(var i = 1; i < tmpRow.find("Data").length; i++){
				
				//Save the TEXT into this variable
				var tmpData = $(tmpRow.find("Data")[i]).text();
				
				//Switch which element we are on
				switch(i){
					case 0://Name
						//Already stored
						break;
					case 1://Date
						tmpEntry.date = tmpData;
						break;
					case 2://Time
						tmpEntry.time = tmpData;
						break;
					case 3://Activity
						tmpEntry.activityOverall = tmpData;
						break;
					case 4://Narrow
						tmpEntry.activityNarrow = tmpData;
						break;
					case 5://People
						tmpEntry.people = tmpData;
						break;
					case 6://Aliveness
						tmpEntry.aliveness = tmpData;
						break;
					case 7://Concentration
						tmpEntry.concentration = tmpData;
						break;
					case 8://Clarity
						tmpEntry.clarity = tmpData;
						break;
					case 9://Anxiety BUT COULD BE THEIR DESCRIPTION
						if(isNaN(tmpData)){//NOT A NUMBER
							console.log("Wasn't a number");
							tmpEntry.notes = tmpData;
						}else{//IS A NUMBER
							tmpEntry.anxiety = tmpData;
						}
						break;
					case 10://Notes
						tmpEntry.notes = tmpData;
						break;
					default://BROKEN
						console.log("BROKEN!!! ======");
				}//end switch/case
			}//end for loop for datas
			allData.people[tmpName].entries.push(tmpEntry);
		}//end for loop for rows
		
		
		//Log the object we now have
		console.log(allData);
		//Give it back to the calling function
		return allData;
	}
	
});