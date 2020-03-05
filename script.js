//let date variables
let day;
let hour;
let min;
let sec;

//let bell date/time variables
let bellday; //what array of bell time we're on
let curtime; //the current time combined
let bell; //which day it is
let minstr; //string versions of those variables
let secstr;
let hrstr;
let newsec; 

//arrays for all possible bell times
let mf = ['080000','082500','083000','084200','093400','102600','105100','114300','123500','131200','131500','140700','145900','150300','151000'];
let tw = ['080000','082500','083000','084200','092700','101200','103700','112200','120700','125100','132600','133100','141500','145900','150300','151000'];
let th = ['080000','082500','083000','084200','093000','101800','104300','113000','121700','125100','132800','133100','141500','145900','150300','151000'];

//time boolean for coding purposes
let realtime = true;
//colours are always enabled
let colours = true; //for auto selection (does not stay enabled that's up to the user)
//adjustment seconds
let adj;

//function for finding the current time (Fake: 9:47:realtimesecondsAM Longbells)
function Time() {
	if (realtime === true) {
		//grab the full date
		let date = new Date();
		//grab the day
		day = date.getDay(); //1..7 
		//grab the hour
		hour = date.getHours(); //0..23
		//grab the min
	    min = date.getMinutes(); //0..59
		//grab the sec
		sec = date.getSeconds(); //0..59
		//stringify the current times
		hrstr = hour.toString();
	
		//do the minute conversions
		if (min < 10) {
			minstr = '0' + min.toString();     //TWO DIGIT NUMBERS NEED TO BE FOR THIS
		} else {
			minstr = min.toString();
		}

		//do the second conversions
		if (sec < 10) {
			secstr = '0' + sec.toString();
		} else {
			secstr = sec.toString();
		}

		//make it into the final time
		curtime = parseInt(hrstr+minstr+secstr);

	} else {
		let date = new Date();
		//FAKE TIME Monday, 9:47:realtimesecondsAM, Longbells
		day = 1;
		hour = 9;
		min = 45;
		sec = date.getSeconds();
		//sec=0;

		//string sections
		hrstr = hour.toString();

		//do the minute conversions
		if (min < 10) {
			minstr = '0' + min.toString();
		} else {
			minstr = min.toString();
		}

		//do the second conversions (to strings)
		if (sec < 10) {
			secstr = '0' + sec.toString();
		} else {
			secstr = sec.toString();
		}
		//make it into the final time
		curtime = parseInt(hrstr+minstr+secstr);
	}
};

//any sort of update of the bell
function bellUpdate(bell) {
	//find the current bell time
	if (bell === 1 || bell === 5) {
		//set for long bells
		bellday = mf;
		//check the long bells radio box
		document.getElementById('long').checked = true;
	} else if (bell === 2 || bell === 3) {
		//set for short bells
		bellday = tw;
		//check the short bells radio box
		document.getElementById('short').checked = true;
	} else if (bell === 4) {
		//set for thursday bells
		bellday = th;
		//check the thursday bell radio box
		document.getElementById('thursday').checked = true;
	} 
};

//for the colour updates
function colourUpdate(bool) {
	//update the colour boolean
	colours = bool;
}

//for the adjustment updates
function adjUpdate(num) {
	//find the number
	console.log(num);
}

//when the webpage opens up, starting function
function init() {
	//find the current time
	Time();
	//setup the current bell time array day
	bellUpdate(day);
	//check if colours are enabled and click respectively
	document.getElementById('yes').checked = colours;
	//check if we're allowed to (meets all conditions)
	if (cond()) {
		//start up the update function
		update();
	}
}

//function for updating the bell time continously
function update() {
	//check if we're allowed to
	if (cond()) {
		//find the current time     
		Time();
		//calculate the time between next bell time and current
		let found = nextBell();
		//find the difference (for the amount of time inbetween now and then)
		let diff = sub(found);
		//output it to the time to the page
		document.getElementById('output').innerHTML = diff;

		//set the timeout in order to do this again in 100ms
		setTimeout(update, 100);

	}
}

//find the next bell time (function w/ return)
function nextBell() {
	//setup looping variables
	let i = 0;
	let notfound = true;
	let des;

	//go through all the bells until one is found
	do {
		//find the raw difference between the two to determine if the bell is ahead of curtime
		des = parseInt(bellday[i]) - curtime;

		//check if the subtraction is positive
		if (des >= 0) {
			//console.log(bellday[i] + ' - ' + curtime + ' = ' + des);
			//return the the bell time
			return bellday[i];
			//it has found one, exit the loop
			notfound = false;
		} else {
			//has not found one, increase i to keep searching
			i++;
		}
	} while (notfound);
}

//subtracting the bell time
function sub(nextBell) {
	//setup variables for next
	let nexthr;
	let nextmin;
	let nextsec;
	let secdiff;

	//10am > onwards
	if (nextBell.length === 6) {
		//grab the hours
		nexthr = nextBell[0];
		nexthr += nextBell[1];
		//grab the minutes
		nextmin = nextBell[2];
		nextmin += nextBell[3];
		//grab the seconds
		nextsec = nextBell[4];
		nextsec += nextBell[5];

	} else { //9am <
		//grab the hours
		nexthr = nextBell[0];
		//grab the minutes
		nextmin = nextBell[1];
		nextmin += nextBell[2];
		//grab the seconds
		nextsec = nextBell[3];
		nextsec += nextBell[4];
	}

	//grab current time components
	let curhr = hrstr;
	let curmin = minstr;
	let cursec = secstr;

	let cursum = parseInt(curmin) + parseInt(curhr*60);
	let nextsum = parseInt(nextmin) + parseInt(nexthr*60);

	/*console.log('next min: ' + nextmin);
	console.log('next hr : ' + nexthr);
	console.log('');*/

	/*console.log(cursum);
	console.log(curmin);
	console.log(curhr); TOTAL OF 587/*

	/*console.log(nextsum); //626
	console.log(nextmin); //26
	console.log(nexthr); //10 TOTAL OF 626*/

	//find the MINUTE difference between the two times
	let mindiff = nextsum-cursum-1; //-1 because adding the seconds to.

	//find if there is any HOUR difference between the two
	let hrdiff = Math.floor(nextmin / 60); //UNUSED (unrealistic)

	//do the usual second subtraction
	secdiff = 60 - cursec; //60 because the bell will always be at the 60 second mark
	
	//to make sure it doesn't display as 60 seconds remaining
	if (secdiff == 60) {
		//set the second difference to 0
		secdiff = 0;
		//increase the min difference as at 0, it has not passed yet
		mindiff++;
	}

	//find the string colour
	if (colours) {
		//find the time remaining and assign the relative colour
		if (mindiff >= 15) {
			col = 'green';
		} else if (mindiff >= 10) {
			col = '#F29D35';
		} else {
			col = '#F24936';
		}
	} else {
		//automatically black
		col = 'black';
	}

	//plate up the string
	let final = "<p id='minutes' style='color: "+col+"'>" + mindiff + " minutes</p><p id='and' style='color: "+col+"'>and</p><p id='seconds' style='color: "+col+"'>" + secdiff + " seconds.</p>";

	//display the title
	document.getElementById('title').innerHTML = mindiff + "m " + secdiff + "s" + " remaining";

	return final;
}

//conditional function
function cond() {
	//check bool
	check = true;

	//find the time
	Time();

	//check if it's not on a saturday or sunday
	if (day === 6 || day === 7) {
		//deny the bell time calculation
		check = false;
		//output a message
		document.getElementById('output').innerHTML = "No bell times on the weekend";
	} else {

		//find the first and last bell times
		let last = bellday[bellday.length-1];
		let first = bellday[0];

		//calculate the differences for both
		let lastsub = last - curtime;
		//console.log(last);
		//console.log(curtime);

		let firstsub = curtime - first;

		//if the difference is negative, the program will NOT run (outside bell times)
		if (lastsub < 0 || firstsub < 0) {
			//set the condition to false
			check = false;
			//output a message
			document.getElementById('output').innerHTML = '<p style="font-size:20px">Outside Terrace bell times</p>';
			document.getElementById('title').innerHTML = 'Outside Terrace Bell Times';
		} 
	}

	//return the final outcome (whether or not we are allowed to continue)
	return check;
}
