document.addEventListener("DOMContentLoaded", () => {
    const bodyGeneral = document.querySelector("body");
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
  
    let humanScore = 0;
    let computerScore = 0;
  
   
    butStar.addEventListener("click", () => {
      containerWelcome.style.display = "none";
      gameScreen.style.display = "flex";
    });
  
  
    const images = document.querySelectorAll(".image-container img");
    images.forEach((img) => img.addEventListener("click", getHumanChoice));
  
    
    function getHumanChoice(event) {
      const clickedImage = event.target.src;
  
      let humanChoice = "";
      if (clickedImage.includes("rock.png")) {
        humanChoice = "rock";
      } else if (clickedImage.includes("paper.png")) {
        humanChoice = "paper";
      } else if (clickedImage.includes("scissors.png")) {
        humanChoice = "scissors";
      }
  
      console.log(`Player 1: ${humanChoice}`);
      playRound(humanChoice, getComputerChoice());
    }
  
   
    function getComputerChoice() {
      const choices = ["rock", "paper", "scissors"];
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      console.log(`Computer: ${randomChoice}`);
      return randomChoice;
    }
  
   
    function playRound(humanChoice, computerChoice) {
      gameScreen.style.display = "none";
      showResults.style.display = "flex";
  
      computerChoiceImage.setAttribute("src", computerChoice + ".png");
      playerChoiceImage.setAttribute("src", humanChoice + ".png");
  
      
      if (humanChoice === computerChoice) {
        showResultText.innerText = "It’s a draw!";
      } else {
        const roundLost =
          (humanChoice === "rock" && computerChoice === "paper") ||
          (humanChoice === "paper" && computerChoice === "scissors") ||
          (humanChoice === "scissors" && computerChoice === "rock");
  
        if (roundLost) {
          computerScore++;
          showResultText.innerText = `You lose! ${computerChoice} beats ${humanChoice}`;
        } else {
          humanScore++;
          showResultText.innerText = `You win! ${humanChoice} beats ${computerChoice}`;
        }
      }
  
      computerScoreText.innerText = `Computer Score: ${computerScore}`;
      humanScoreText.innerText = `Player 1 Score: ${humanScore}`;
  
     
      if (humanScore === 5 || computerScore === 5) {
        showResultText.innerText =
          humanScore === 5 ? "You won the game!" : "Computer won the game!";
          changeButText("Play Again");
         

      }
    }
    
    function changeButText(text) {
        playNextRoundBut.querySelector("span").innerText = text;
    
        if (text === "Play Again") {
            playNextRoundBut.removeEventListener("click", playNext);
            playNextRoundBut.addEventListener("click", resetGame);
        } else {
            playNextRoundBut.removeEventListener("click", resetGame);
            playNextRoundBut.addEventListener("click", playNext);
        }
    }

    function resetGame(){
      humanScore=0;
      computerScore=0;
     computerScoreText.innerText=`Computer Score: ${computerScore}`;
     humanScoreText.innerText=`Player 1 Score: ${humanScore}`;
     showResults.style.display = "none";
     gameScreen.style.display = "flex";
     computerChoiceImage.setAttribute("src", "");
     playerChoiceImage.setAttribute("src", "");
     showResultText.innerText ="";
     changeButText("Next Round");
     images.forEach((img) => img.addEventListener("click", getHumanChoice));
    

    }

    function playNext() {
      if (humanScore === 5 || computerScore === 5) {
        alert("Game Over! Refresh to play again.");
        return;
      }
      showResults.style.display = "none";
      gameScreen.style.display = "flex";
    }
  
    playNextRoundBut.addEventListener("click", playNext);
  });