/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        
        //create a new div element, which will become the game card
        const gameCard = document.createElement('div');
        // add the class game-card to the list
        gameCard.classList.add('game-card');

         // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Pledged: $${games[i].pledged}</p>
            <p>Backers: ${games[i].backers}</p>
        `;
        // append the game to the games-container
        document.getElementById('games-container').appendChild(gameCard);

    }
    
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

contributionsCard.textContent = totalContributions;
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");



// Calculate the total amount raised using the 'pledged' property
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

// Update the raisedCard element with the total amount raised
raisedCard.textContent = `$${totalRaised.toLocaleString()}`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Calculate the total number of games
const totalGames = GAMES_JSON.length;

// Update the gamesCard element with the total number of games
gamesCard.textContent = totalGames;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    console.log("filterUnfundedOnly function called"); // Check if the function is called
    const gamesContainer = document.getElementById('games-container');

    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });
         
    console.log("Number of unfunded games:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

filterUnfundedOnly();
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);



// show only games that are fully funded
function filterFundedOnly() {
    console.log("filterFundedOnly function called");

    // Get the games container element
    const gamesContainer = document.getElementById('games-container');

    // Clear the games container before adding new games
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // Log the number of funded games to the console
    console.log("Number of funded games:", fundedGames.length);

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);


}
filterFundedOnly();
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);


// show all games
function showAllGames() {
    const gamesContainer = document.getElementById('games-container');

    // Clear the games container before adding new games
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

showAllGames()
document.getElementById("all-btn").addEventListener("click", showAllGames);




const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const unfundedGamesCount = unfundedGames.length;
console.log("Number of unfunded games:", unfundedGamesCount);

// create a string that explains the number of unfunded games using the ternary operator
let displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded. We need your help to fund these amazing games!`;
console.log(displayStr)

// create a new DOM element containing the template string and append it to the description container

let newParagraph = document.createElement('p');

// Set the text content of the new paragraph to the display string
newParagraph.textContent = displayStr;

// Append the new paragraph to the description container
let description = document.getElementById('description-container');
description.appendChild(newParagraph);





/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");





const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});


// use destructuring and the spread operator to grab the first and second games

const [mostFunded, secondMostFunded, ...otherGames] = sortedGames;

console.log("Most Funded Game:", mostFunded.name);
console.log("Second Most Funded Game:", secondMostFunded.name);

const topGameElement = document.createElement('p');
topGameElement.textContent = mostFunded.name;  

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement('p');
secondGameElement.textContent = secondMostFunded.name;  // Set the name of the second most funded game

secondGameContainer.appendChild(secondGameElement);



