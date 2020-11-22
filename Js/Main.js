//Insturction win//
const instWin = document.querySelector(".instructions");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");

//Selecting Elements//
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const name0 = document.querySelector("#name--0");
const name1 = document.querySelector("#name--1");

const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

//Selecting Buttons//
const dice = document.querySelector(".dice");

const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

//Globally vars...
let currentScore, activePlayer, playing, scores;

//Initial function for all game
const initVar = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  name0.textContent = "player1";
  name1.textContent = "player2";

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
initVar();

//Close button function
closeBtn.addEventListener("click", function () {
  instWin.classList.add("hidden");
  overlay.classList.add("hidden");
});

//Rolling dice function
dice.classList.add("hidden");
rollBtn.addEventListener("click", function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNumber}.png`;

    //Player 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;

      //Switch to player 1
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle("player--active");
      player1.classList.toggle("player--active");
    }
  }
});

//Hold button function
holdBtn.addEventListener("click", function () {
  if (playing) {
    if (document.getElementById(`current--${activePlayer}`).textContent > 0) {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 100) {
        playing = false;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");
        dice.classList.add("hidden");

        if (
          document
            .querySelector(`.player--${activePlayer}`)
            .classList.contains("player--winner")
        ) {
          document.getElementById(`name--${activePlayer}`).textContent =
            "Winner";
        }
      } else {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0.classList.toggle("player--active");
        player1.classList.toggle("player--active");
      }
    }
  }
});
//Start new game button function
newBtn.addEventListener("click", initVar);
