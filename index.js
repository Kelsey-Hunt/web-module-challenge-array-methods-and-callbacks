const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/

const filter2014 = fifaData.filter((teamData) => {
    return teamData.Year == "2014" && teamData.Stage == 'Final';
});
console.log(filter2014);

//(a) Home Team name for 2014 world cup final

console.log('Task 1a',filter2014[0]['Home Team Name']);

//(b) Away Team name for 2014 world cup final

console.log('Task 1b', filter2014[0]['Away Team Name']);

//(c) Home Team goals for 2014 world cup final

console.log('Task 1c', filter2014[0]['Home Team Goals']);

//(d) Away Team goals for 2014 world cup final

console.log('Task 1d', filter2014[0]['Away Team Goals']);

//(e) Winner of 2014 world cup final */

console.log('Task 1e', filter2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    const finalsList = data.filter((item) => {
        return item.Stage === 'Final';
    });
    return finalsList;
 }


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, cb) {
    const finalsData = cb(data);
    const yearsList = finalsData.map((element) => {
        return element.Year;
    });
    return yearsList;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data, cb) {
   return cb(data).map(item => item['Home Team Goals'] > item['Away Team Goals'] ? item['Home Team Name'] : item['Away Team Name']);
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getFinalsCB, getYearsCB, getWinnersCB) {
    const finalsTeams = getFinalsCB(data);
    const years = getYearsCB(data, getFinalsCB);
    const winners = getWinnersCB(data, getFinalsCB);
    const winnersByYear = [];
    let i = 0;
    years.forEach(function(element){
        winnersByYear.push(`In ${element}, ${winners[i]} won the world cup!`);
        i++;
    });
    return winnersByYear;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(getFinalsCB) {
    const finalsData = getFinalsCB;
    const totalHomeGoals = finalsData.reduce((goals, currentValue) => {
        return goals + currentValue['Home Team Goals'];
    }, 0);
    const totalAwayGoals = finalsData.reduce((goals, currentValue) => {
        return goals + currentValue['Away Team Goals'];
    }, 0);
    return ((totalHomeGoals + totalAwayGoals)/finalsData.length).toFixed(2);
 }




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    const finalists = data.filter((item) => {
        return item.Stage === 'Final';
    });
    const winnerInitials = finalists.map(item => item['Home Team Goals'] > item['Away Team Goals'] ? item['Home Team Initials'] : item['Away Team Initials']);
    let wins = 0;   
    const winsByInitials = winnerInitials.reduce((accumulator, currentValue) => {
        if(currentValue === teamInitials){
            return wins = wins + 1;
        }
        return wins;
    },0);
    return wins;
}
console.log('stretch 1', getCountryWins(fifaData, 'ITA'));


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
