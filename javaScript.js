function getComputerChoice() {
    let choice = ['rock', 'paper', 'scissors'];
    let randomChoice = Math.floor(Math.random() * choice.length);
    let finalChoice = choice[randomChoice];
    console.log(`Computer: ${finalChoice}`);
    return finalChoice
};



function getHumanChoice() {

    let inputChoice = prompt('rock, paper or scissors?')
   let humanChoice = inputChoice.toLowerCase();
    console.log(`Player 1: ${humanChoice}`);
    return humanChoice;

};



let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    const rock = 'rock';
    const paper = 'paper';
    const scissors = 'scissors';

    if (humanChoice === computerChoice) {
        console.log('It is a draw');
        return 'draw';
    }

    let roundLost = (humanChoice === rock && computerChoice === paper) ||
                    (humanChoice === paper && computerChoice === scissors) ||
                    (humanChoice === scissors && computerChoice === rock);
    
    let roundWon = (humanChoice === rock && computerChoice === scissors) ||
                   (humanChoice === paper && computerChoice === rock) ||
                   (humanChoice === scissors && computerChoice === paper);

    if (roundLost) {
        console.log(`You lose, ${computerChoice} beats ${humanChoice}`);
        return "roundLost";
    } else if (roundWon) {
        console.log(`You win, ${humanChoice} beats ${computerChoice}`);
        return "roundWon";
    }};

function playGame() {
   console.log("Starting the battle")
    for (let i = 0; i < 5; i++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        const roundResult = playRound(humanSelection, computerSelection);


        if (roundResult === "roundLost") {
            computerScore += 1;
        } else if (roundResult === "roundWon") {
            humanScore += 1;
        };console.log(`Current Score: Player 1: ${humanScore}  Computer: ${computerScore}`);
    };

    
    console.log(`Final Scores: Player: ${humanScore}, Computer: ${computerScore}`);
}

playGame();
