// let params = new URLSearchParams(document.location.search);
// console.log(params.get('winner'));

// if (!sessionStorage.getItem(LSKEY)) {
//   alert("Please play a game!");
//   window.location.assign(`${window.location.origin}/index.html`);
//   throw new Error("Take your turn on main page!");
// }

const gameResult = JSON.parse(sessionStorage.getItem(LSKEY));

const userPickDiv = document.getElementById("user__pick");
const pcPickDiv = document.getElementById("pc__pick");
const winStatusSpan = document.getElementById("win__status");
const gameActionDiv = document.querySelector(".game__action > div");
const winPageLink = document.getElementById("win__page__link");
const replayButton = document.querySelector('.game__action > a')

userPickDiv.innerHTML = `<div class="rps_img__container ${gameResult.userSelects}">
    <img src="assets/img/${gameResult.userSelects}.png" alt="${gameResult.userSelects}" />
  </div>`;

pcPickDiv.innerHTML = `<div class="rps_img__container ${gameResult.pcSelects}">
    <img src="assets/img/${gameResult.pcSelects}.png" alt="${gameResult.pcSelects}" />
  </div>`;

  
let winningRings;

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

  replayButton.textContent = 'REPLAY';
}

if (winningRings) {
  winningRings.forEach((ring) => ring.classList.add("won"));
}

window.onbeforeunload = function () {
  sessionStorage.removeItem(LSKEY);
};
