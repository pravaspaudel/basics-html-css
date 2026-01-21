let randomNumber = Math.floor(Math.random() * 100) + 1;
let score = 7;

function checkGuess() {
  const userGuess = Number(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const scoreText = document.getElementById("score");

  if (!userGuess) {
    message.textContent = "Please enter a number!";
    return;
  }

  if (userGuess === randomNumber) {
    message.textContent = "Correct";
  } else {
    score--;

    if (score === 0) {
      message.textContent = "game over! The number was " + randomNumber;
    } else if (userGuess > randomNumber) {
      message.textContent = "high!";
    } else {
      message.textContent = "low!";
    }
  }

  scoreText.textContent = "Score: " + score;
}
