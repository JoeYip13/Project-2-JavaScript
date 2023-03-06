const userChoices = document.querySelectorAll('[data-selection]');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const userScoreSpan = document.getElementById('user-count');
const computerScoreSpan = document.getElementById('computer-count');
const resultDisplay = document.getElementById('result');
const gameRules = [ 
    {
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
]



// A for loop when user 'clicks' a button, this gets the data-selection attribute and prints out the selected name the user has clicked on.
userChoices.forEach(userChoice => {
    userChoice.addEventListener('click', e => {
        const selectionName = userChoice.dataset.selection
        const selection = gameRules.find(selection => selection.name === selectionName);
        let userSelection = selection.name;
        userChoiceDisplay.innerHTML = userSelection; // Prints the selection name user has chosen in the span id 
        
        console.log(selection.name);
        
        makeChoice(selection); 
    })
})

// This function is runned when user has chosen a button.
function makeChoice(selection) {
    const computerSelection = computerChoice();
    computerChoiceDisplay.innerHTML = computerSelection.name; // Prints the name computer has chosen in the span id 
    theWinner(selection, computerSelection);
    console.log(computerSelection.name);
}

// This function gets a random computer choice from the Global gameRules   
function computerChoice() {
    const randomChoice = Math.floor(Math.random() * gameRules.length);
    return gameRules[randomChoice];
    
}

function theWinner(selection, computerSelection) {
    if (selection.name === computerSelection.name) {
        resultDisplay.innerHTML = 'Oh Snap! Looks like we tied. Lets Go Again!';
        console.log('Tie, we play again');
    } else {
        if (selection.beats.includes(computerSelection.name)) {;
        resultDisplay.innerHTML = 'You Win!';    
        incrementScore(userScoreSpan);
        console.log('You Win!');
        } else { 
        resultDisplay.innerHTML = 'You Lose!';
        incrementScore(computerScoreSpan);
        console.log('Computer Wins');
    }
}
}

// Function to increment score
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;

    matchWinner();
}

function matchWinner() {
    if (userScoreSpan === 2) {
        resultDisplay.innerHTML = "Congradulations! You Won the Match!"
        userScoreSpan === null;
    }
    if (computerScoreSpan === 2) {
        resultDisplay.innerHTML = "Computer wins the Match!"
        computerScoreSpan === null;
    }
    
}
















