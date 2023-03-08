/**  
 * Global Varibles 
 *  */

/**
 * @const userChoices is all the data attribute 'data-selection' in HTML (Rock, Paper, Scissors, Lizard, Spock)
 */
const userChoices = document.querySelectorAll('[data-selection]');

/**
 * @const userChoiceDisplay gets the span id of 'user-choice' in the result section
 */
const userChoiceDisplay = document.getElementById('user-choice');

/**
 * @const computerChoiceDisplay gets the id of the 'computer-choice'
 */
const computerChoiceDisplay = document.getElementById('computer-choice');

/**
 * @const userScoreSpan gets the span id of 'user-count in the score section
 */
const userScoreSpan = document.getElementById('user-count');

/**
 * @const computerScoreSpan gets the span id of 'computer-count' in the score section
 */
const computerScoreSpan = document.getElementById('computer-count');

/**
 * @const resultDisplay gets the span id of 'result' in the result section
 */
const resultDisplay = document.getElementById('result');

/**
 * @const playAgain gets the button id of 'play-again' in the result section
 */
const playAgainBtn = document.getElementById('play-again');

/**
 * @const gameRules contains the game rules logic. We have objects inside an Array which are the 'name' and 'beats'. We also have a Array inside the object which contain the string values that beats the 'name'
 */
const gameRules = [{
        name: 'Rock',
        beats: ['Scissors', 'Lizard']
    },
    {
        name: 'Paper',
        beats: ['Rock', 'Spock']
    },
    {
        name: 'Scissors',
        beats: ['Paper', 'Lizard']
    },
    {
        name: 'Lizard',
        beats: ['Paper', 'Spock']
    },
    {
        name: 'Spock',
        beats: ['Rock', 'Scissors']
    }
];

/** 
 * Modal
 * */

/**
 * @const modal gets the section element with class of 'modal' in the Modal Section in html doc.
 */
const modal = document.querySelector('.modal');

/**
 * @const overlay gets the div element with class of 'overlay' in the Modal Section in html doc.
 */
const overlay = document.querySelector('.overlay');

/**
 * @const openModalBtn gets the button element with class of 'btn-open' in the <header> in html doc.
 */
const openModalBtn = document.querySelector('.btn-open');

/**
 * @const closeModalBtn gets the button element with class of 'btn-close' in the Modal Section in html doc.
 */
const closeModalBtn = document.querySelector('.btn-close');

/** 
 * close modal function
 * @const closeModal creates a function called closeModal, 
 * get the DOM classList property of 'modal' and 'overlay' and adds the class of 'hidden'.
 * */
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

/** 
 * close the modal when the close button and overlay is clicked
 * */
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

/**
 * close modal when the Esc key is pressed and does not contain the class of 'hidden'
 */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

/**
 * open modal function
 * @const openModal creates a function called openModal,
 * gets the DOM classList property of 'modal' and 'overlay' and removes the class of 'hidden'
 */
const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

/**
 * open modal event
 * listens for 'click' event on the button 'btn-open' and runs the openModal function
 */
openModalBtn.addEventListener('click', openModal);



/**
 * A for loop when user 'clicks' a button, this gets the data-selection attribute and prints out the selected name the user has clicked on.
 * 
 */
userChoices.forEach(userChoice => {
    userChoice.addEventListener('click', e => {
        const selectionName = userChoice.dataset.selection;
        const selection = gameRules.find(selection => selection.name === selectionName);
        let userSelection = selection.name;
        userChoiceDisplay.innerHTML = userSelection; // Prints the selection name user has chosen in the span id 

        console.log('You chose' + ' ' + selection.name);

        makeChoice(selection);
    });
});


/**
 * This function is runned when user has chosen a button.
 * @function makeChoice this takes the user selection
 */
function makeChoice(selection) {
    const computerSelection = computerChoice();
    computerChoiceDisplay.innerHTML = computerSelection.name; // Prints the name computer has chosen in the span id 
    theWinner(selection, computerSelection);
    
    console.log('Computer chose' + ' ' + computerSelection.name);
}


/**
 * This function gets a random computer choice from the Global gameRules array
 * @function computerChoice randomly generates a random number multipled by the gameRules Array length. Math.floor rounds the number down and returns it to the nearest interger so when the Return statement returns the random result, it will print the name from the Array.
 */
function computerChoice() {
    const randomChoice = Math.floor(Math.random() * gameRules.length);
    return gameRules[randomChoice];

}

/**
 * Function to determine,  user selection compared with random computer selection.
 * @param {string} selection - The user selection 
 * @param {string} computerSelection - The computer selection
 */
function theWinner(selection, computerSelection) {
    if (selection.name === computerSelection.name) {
        resultDisplay.innerHTML = 'Oh Snap! Looks like we tied. Lets Go Again!';
        resultDisplay.style.backgroundColor = '#ff6f91';
        console.log('Tie, we play again');
    } else {
        if (selection.beats.includes(computerSelection.name)) {
            resultDisplay.innerHTML = 'You Win!';
            resultDisplay.style.backgroundColor = '#38B124';
            incrementScore(userScoreSpan);
            console.log('You Win!');
        } else {
            resultDisplay.innerHTML = 'You Lose!';
            resultDisplay.style.backgroundColor = '#f11919';
            incrementScore(computerScoreSpan);
            console.log('Computer Wins');
        }
    }

    matchWinner();

    console.log('User' + ' ' + userScoreSpan.innerText);
    console.log('Computer' + ' ' + computerScoreSpan.innerText);

}

/**
 * Function to increment score
 * @param {string} scoreSpan - increments the score, parseInt converts a string into a number and +1 value.
 */
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}