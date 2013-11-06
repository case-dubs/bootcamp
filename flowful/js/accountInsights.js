//When the document is ready, create the empty table
$(document).ready(function() {

	//The empty object that will hold all of the data for each person
	var tmpPerson = {
			name: '',//The name
			data: {},//Their misc data (NOT entries, and not being populated)
			entries: []//The entries
	};
	
	//When somebody clicks the submit button, get the URLs and load-parse-save
	$(document).ready(function() {
		//The url to GET the xml from
		var urlGet = $("#input").val();
		//The url to POST the json to
		var urlPost = $("#output").val();
		
		//Log that the button was clicked
		console.log("Clicked!");
		
		//This ajax call gets the .xml
		$.ajax({
			url: 'caseyconverter/flowfulPilotV1.xml',//The url plus '.xml'
			dataType: 'xml',//It's an xml...
			success: function(myData){
				//Log the data that we just pulled from the xml
				console.log(myData);
				//Try to save the data === = NOT WORKING = ===
				$.post(urlPost + ".json", parseXML(myData));
			},
			error: function(xhr, text, errorScript){
				//If there was an error, print that out
				console.log("FAILURE");
				console.log(text);
				console.log(errorScript);
			}
		});
	});
	
	//This function goes through the data and parses it
	function parseXML(data){
		//Get the table element from the xml
		var table = $($(data).find("Table")[0]);
		//Create a variable to push the data into

		
		
		//console.log(table);
		
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
			
			//Write the name of the person
			tmpPerson.name = $(tmpRow.find("Data")[0]).text();
			
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
			tmpPerson.entries.push(tmpEntry);
		}//end for loop for rows
		
		
		//Log the object we now have
		console.log(tmpPerson);
		//Give it back to the calling function
		return tmpPerson;
	}
	
});

/*Functions for the top graph - parameters for these equations are likely (start date, end date) depending on how the time duration is set - if not using an api call*/

//To be used when page loads and when user modifies the start and end date measured. Determines the start and end date for the data being measured. This will be reused in both the first two sections of the page
function dateRangeCalculator(){

	//start date

	//end date

	//Api call request that reloads page/section based off of time span requested OR trimming original data object/array based off of new specified date range 


}

//Calculates and display on page basic aliveness stats for the time range selected
function alivenessStats(){

	//Avg. aliveness

	

	//Highest aliveness reported

	//Lowest aliveness

}

//Calculates and display on page basic people stats for the time range selected
function peopleStats(){

	//Categories: alone, core, acquaintances, strangers, colleagues [for starters, let's group singular and plural instances - eg: colleague and colleagues to see what that data looks like]

	//Most frequently w/: 

	//Greatest happiness on avg. for time range with, if available, must be 3 times to ensure that it isn't an outlier, when user is with...

	//Lowest aliveness w/

}

//Calculates and display on page basic activity stats for the time range selected
function activityStats(){

	//Broad categories: work, leisure, hobbies, maintenance

	//Most frequently doing:

	//Greatest happiness on avg. for time range with, if available, must be 3 times to ensure that it isn't an outlier, when engaged in X activity:

	//Lowest aliveness when engaged in what category of activity

}

//Calculates, compares and displays on page basic stats for two users for the time range selected
function friendComparer(){



}

/*Functions for the second, "You and your environement", section of the page*/

//In this section, I need to build concentric circles with id's for each activty/people type and then change the background color based off of it's relative ranking for that time range
	//Need to create a way to detect which area of the cirlce is being moused over - to then trigger the Breakdown() events

//Calculates and ranks user's aliveness level by people type for the specified date duration
function youAndPeopleRanker(){

	//Calculate average aliveness level per people type for the specified time range

	//Rank from highest to lowest and asign a color for each ranking

}

//Calculates stats related to user's aliveness by activity depending on whether they are alone, 1-1 or in a group 
function youAndPeopleBreakdown(){

	//Call youAndActivityRanker() for stats on avg. aliveness by activity


}

//Calculates and ranks user's aliveness level by activity type for the specified date duration
function youAndActivityRanker(){

	//Calculate average aliveness level per activty type for the specified time range

	//Rank from highest to lowest and asign a color for each ranking

}

//For each activity type, reports which 3 activities (if enough data - 6 data points - is available) have the highest and lowest aliveness instance and reports the aliveness level of that instance. An alternative would be to calculate the average aliveness level for the activty subcategory, rather than by single instance
function youAndActivityBreakdown(){

	//loop that runs through each activty type
		//loop that runs through each instance within that activty type and ranks the instances from highest to lowest - in an array

		//then chooses the 3 highest and lowest instances and prints the sub-activity and the aliveness level for that instance 

}

