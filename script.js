// constants
const LSKEY = "jsRPS";
const PC_OPTIONS = ["rock", "paper", "scissors"];

// select elements
const userScore = document.getElementById("user__score");
const computerScore = document.getElementById("computer__score");

const rulesBtn = document.getElementById("rules__btn");
const closeRulesBtn = document.querySelector(".aside__close");

const rpsButtons = document.querySelectorAll(".rps_img__container");

const gameStartDiv = document.querySelector("#game-start-div");
const gameResultDiv = document.querySelector("#game-result-div");

const mainEl =   document.querySelector('main');
const hurrayEl = document.querySelector('.hurray__container');
const buttonDiv = document.querySelector('.button__div');

// Game result div components

const userPickDiv = document.getElementById("user__pick");
const pcPickDiv = document.getElementById("pc__pick");
const winStatusSpan = document.getElementById("win__status");
const gameActionDiv = document.querySelector(".game__action > div");
const winPageLink = document.getElementById("win__page__link");
const replayButton = document.querySelector(".game__action > a");

// handle localStorage
let rawScore = localStorage.getItem(LSKEY);
let score;
let winningRings;

if (!rawScore) {
  let zeroScore = { user: 0, pc: 0 };
  localStorage.setItem(LSKEY, JSON.stringify(zeroScore));
  score = zeroScore;
} else {
  score = JSON.parse(rawScore);
  userScore.innerText = score.user;
  computerScore.innerText = score.pc;
}

rpsButtons.forEach((btn) => btn.addEventListener("click", startGame));

// functions
function startGame(e) {
  const userSelects = e.target.dataset.name;
  const pcSelects = getPCSelection();

  const winner = determineWinner(userSelects, pcSelects);

  if (winner === "user") {
    score.user += 1;
  } else if (winner === "pc") {
    score.pc += 1;
  }

  saveScore(score);

  userScore.innerText = score.user;
  computerScore.innerText = score.pc;

  gameStartDiv.classList.add("hidden");
  gameResultDiv.classList.remove("hidden");

  showWinner({ userSelects, pcSelects, winner });
}

function getPCSelection() {
  const index = Math.floor(Math.random() * 3);
  return PC_OPTIONS[index];
}

function determineWinner(userOption, pcOption) {
  if (userOption === pcOption) {
    return "tied";
  } else if (userOption === "rock") {
    if (pcOption === "paper") {
      return "pc";
    } else {
      return "user";
    }
  } else if (userOption === "paper") {
    if (pcOption === "scissors") {
      return "pc";
    } else {
      return "user";
    }
  } else if (userOption === "scissors") {
    if (pcOption === "rock") {
      return "pc";
    } else {
      return "user";
    }
  }
}

function saveScore(scores) {
  localStorage.setItem(LSKEY, JSON.stringify(scores));
}

// toggle game rules
rulesBtn.addEventListener("click", toggleRules);
closeRulesBtn.addEventListener("click", toggleRules);

function toggleRules(e) {
  document.getElementById("rules__container").classList.toggle("show__rules");
}

function showWinner(gameResult) {
  userPickDiv.innerHTML = `<div class="rps_img__container ${gameResult.userSelects}">
    <img src="assets/img/${gameResult.userSelects}.png" alt="${gameResult.userSelects}" />
  </div>`;

  pcPickDiv.innerHTML = `<div class="rps_img__container ${gameResult.pcSelects}">
    <img src="assets/img/${gameResult.pcSelects}.png" alt="${gameResult.pcSelects}" />
  </div>`;

  if (gameResult.winner === "user") {
    winningRings = document.querySelectorAll(
      '#user__choice__div  div[class*="__ring"]'
    );
    winStatusSpan.innerText = "WIN";
    winPageLink.style.display = "inline-block";
  } else if (gameResult.winner === "pc") {
    winningRings = document.querySelectorAll(
      '#pc__choice__div  div[class*="__ring"]'
    );
    winStatusSpan.innerText = "LOST";
  } else if (gameResult.winner === "tied") {
    document.querySelector(".game__action > div").innerHTML = `
  <div>
    <p>TIE UP</p>
  </div>`;

    replayButton.textContent = "REPLAY";
  }

  if (winningRings) {
    winningRings.forEach((ring) => ring.classList.add("won"));
  }
}


winPageLink.addEventListener("click", () => {
  hurrayEl.classList.remove("hidden")
  buttonDiv.classList.add('hidden')
  mainEl.replaceChildren(hurrayEl)
})