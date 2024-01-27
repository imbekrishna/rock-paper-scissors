// constants
const LSKEY = "jsRPS";
const PC_OPTIONS = ["rock", "paper", "scissors"];

// select elements
const userScore = document.getElementById("user__score");
const computerScore = document.getElementById("computer__score");

const rulesBtn = document.getElementById("rules__btn");
const closeRulesBtn = document.querySelector(".aside__close");

const rpsButtons = document.querySelectorAll(".rps_img__container");

// handle localStorage
let rawScore = localStorage.getItem(LSKEY);
let score;

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

  sessionStorage.setItem(
    LSKEY,
    JSON.stringify({ userSelects, pcSelects, winner })
  );

// works everywhere

  let url =
    window.location.href.split("/").slice(0, -1).join("/") + "/game.html";

  window.location.assign(url)

  // This works with live server but not with github
  // window.location.assign(`${window.location.origin}/game.html`);
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
