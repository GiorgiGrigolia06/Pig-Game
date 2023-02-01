"use strict";

// Selecting Elements:
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0"); // Same as document.getElementByID("score--0"); //
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// Starting Conditions:
const init = function () {
  scores = [0, 0]; // stored scores of the each player; //
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};

init(); // Launching "init" function; //

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Switch from 0 to 1 and vice versa;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

// Rolling dice functionality:
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll;
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice;
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1;
    if (dice !== 1) {
      // Add dice to current score;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player;
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score;
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100;
    if (scores[activePlayer] >= 100) {
      // Finish the game;
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player;
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
