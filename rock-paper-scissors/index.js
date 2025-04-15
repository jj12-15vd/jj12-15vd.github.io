let human_score = 0;
let comp_score = 0;

function getComputerChoice() {
  let comp_choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * comp_choices.length);
  return comp_choices[randomIndex];
}

function play_round(human_choice, comp_choice) {
  human_choice = human_choice.toLowerCase();
  if (
    (human_choice == "rock" && comp_choice == "paper") ||
    (human_choice == "paper" && comp_choice == "scissors") ||
    (human_choice == "scissors" && comp_choice == "rock")
  ) {
    console.log("You lose! " + human_choice + " loses to " + comp_choice);
    comp_score += 1;
  } else if (human_choice === comp_choice) {
    console.log("It's a draw!");
  } else {
    console.log("You win! " + human_choice + " wins against " + comp_choice);
    human_score += 1;
  }
  
  updateScore();
  checkGameEnd();
}

function updateScore() {
  scoreDisplay.textContent = `Your score: ${human_score} | Computer score: ${comp_score}`;
}

function checkGameEnd() {
  if (human_score === 5 || comp_score === 5) {
    result.textContent = human_score > comp_score
      ? `You won! Final score: ${human_score}-${comp_score}`
      : `Computer won! Final score: ${comp_score}-${human_score}`;
    
    [rock, paper, scissors].forEach(button => button.disabled = true);
  }
}

const scoreDisplay = document.createElement("div");
const result = document.createElement("p");
scoreDisplay.style.marginTop = "20px";
result.style.fontWeight = "bold";
document.body.appendChild(scoreDisplay);
document.body.appendChild(result);

updateScore();

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");

rock.addEventListener("click", () => play_round("rock", getComputerChoice()));
paper.addEventListener("click", () => play_round("paper", getComputerChoice()));
scissors.addEventListener("click", () => play_round("scissors", getComputerChoice()));
