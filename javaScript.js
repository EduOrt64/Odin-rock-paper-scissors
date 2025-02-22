document.addEventListener("DOMContentLoaded", () => {
  const containerWelcome = document.querySelector("#welcome-container");
  const butStar = document.querySelector(".but-play");
  const gameScreen = document.querySelector(".game-screen");
  const showResults = document.querySelector(".choices");
  const computerChoiceImage = document.querySelector("#computer-choice-img");
  const playerChoiceImage = document.querySelector("#player1-choice-img");
  const showResultText = document.querySelector(".show-results-text");
  const computerScoreText = document.querySelector("#computer-score");
  const humanScoreText = document.querySelector("#player1-score");
  const playNextRoundBut = document.querySelector(".next-round-but");


  const GAME_STATES = {
    NOT_STARTED: 0,
    PLAYING: 1,
    OVER: 2
  }
  const ROUND_RESULTS = {
    LOOSE: -1,
    DRAW: 0,
    WIN: 1,
  }

  let humanScore = 0; let computerScore = 0;
  let gameState = GAME_STATES.NOT_STARTED;

  // Setup listeners
  butStar.addEventListener("click", resetGame);
  const images = document.querySelectorAll(".image-container img");
  images.forEach((img) => img.addEventListener("click", getHumanChoice));
  playNextRoundBut.addEventListener("click", goToNextPhase);

  function displayScreen(screen) {
    // select body children and hide all of them
    const screens = document.querySelectorAll(`body > *`);
    screens.forEach((element) => hide(element));
    // show the screen requested
    show(screen);
  }
  function show(element) { element.classList.remove('hidden'); }
  function hide(element) { element.classList.add('hidden'); }

  function getHumanChoice(event) {
    const clickedImage = event.target.src;
    // uses regex to extract the choice from the image src
    let humanChoice = clickedImage.replace(/^\/?(.*\/)*(.*)\.png/i, "$2");
    // ^\/? matches 0 or 1 slash at the beginning
    //  (.*\/)* matches zero or more things like this "folder1/folder2/"
    // (.*) Matches anything
    // \.png matches ".png"
    // i means ignore case
    // "$2" means replace everything that matched the regex pattern with whatever matched the pattern from the second parenthesis
    // the parenthesis means groups so group 1 matches the folders path and the group 2 matches the image name without the extension .png


    // Here is another easier alternative
    //humanChoice = event.target.name;

    console.log(`Player 1: ${humanChoice}`);
    playRound(humanChoice);
    displayScreen(showResults);
  }

  function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    let roundResult = ROUND_RESULTS.DRAW;
    if (humanChoice !== computerChoice) {
      const roundLost =
        (humanChoice === "rock" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "rock");
      if (roundLost) {
        roundResult = ROUND_RESULTS.LOOSE;
        computerScore++;
      }
      else {
        roundResult = ROUND_RESULTS.WIN;
        humanScore++;
      }
    }
    updateScores();
    updateResults({ result: roundResult, humanChoice, computerChoice })
  }

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log(`Computer: ${randomChoice}`);
    return randomChoice;
  }

  function updateResults({ result, humanChoice, computerChoice }) {
    // Update choices
    computerChoiceImage.setAttribute("src", computerChoice + ".png");
    playerChoiceImage.setAttribute("src", humanChoice + ".png");

    // Update Game Results
    if (humanScore === 5 || computerScore === 5) {
      showResultText.innerText = humanScore === 5 ? "You won the game!" : "Computer won the game!";
      changeButText("Play Again");
      gameState = GAME_STATES.OVER;
      return;
    }

    // Update Round Results
    changeButText("Next Round");
    switch (result) {
      case ROUND_RESULTS.DRAW:
        showResultText.innerText = "It’s a draw!";
        break;
      case ROUND_RESULTS.LOOSE:
        showResultText.innerText = `You lose! ${computerChoice} beats ${humanChoice}`;
        break;
      case ROUND_RESULTS.WIN:
        showResultText.innerText = `You win! ${humanChoice} beats ${computerChoice}`;
        break;
      default: break;
    }
  }

  function updateScores() {
    computerScoreText.innerText = `Computer Score: ${computerScore}`;
    humanScoreText.innerText = `Player 1 Score: ${humanScore}`;
  }

  function changeButText(text) { playNextRoundBut.querySelector("span").innerText = text; }

  function goToNextPhase() {
    if (gameState === GAME_STATES.PLAYING)
      playNext();
    else
      resetGame();
  }

  function resetGame() {
    humanScore = computerScore = 0;
    gameState = GAME_STATES.PLAYING;
    updateScores();
    displayScreen(gameScreen);
  }
  function playNext() {
    displayScreen(gameScreen);
  }
});