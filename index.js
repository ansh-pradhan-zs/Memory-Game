const icons = [
  "./assets/cake-slice.png",
  "./assets/car.png",
  "./assets/duck.png",
  "./assets/ice-cream.png",
  "./assets/laptop.png",
  "./assets/pen.png",
  "./assets/umbrella.png",
  "./assets/wrench.png",
];

let moves = 0;
let matches = 0;
let misses = 0;

function createGrid() {
  // * Initial Configuration of the game state
  const gameGridContainer = document.querySelector(".game-grid-container");
  document.getElementById("moves").innerHTML = moves;
  document.getElementById("misses").innerHTML = misses;
  document.getElementById("matches").innerHTML = matches;
  document.querySelector(".reset-div").addEventListener("click", () => {
    location.reload();
  });
  document.querySelector(".results-container").classList.add("result-hidden");

  const replayButton = document.querySelector(".replay-button");
  replayButton.addEventListener("click", () => {
    location.reload();
  });

  const iconPairs = [...icons, ...icons];
  shuffleArray(iconPairs);

  iconPairs.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");

    const frontCard = document.createElement("div");
    frontCard.classList.add("front-card");

    const backCard = document.createElement("div");
    backCard.classList.add("back-card");

    const img = document.createElement("img");
    img.src = icon;
    img.alt = "icon";
    img.classList.add("icon");

    backCard.appendChild(img);
    flipCardInner.appendChild(frontCard);
    flipCardInner.appendChild(backCard);
    card.appendChild(flipCardInner);
    gameGridContainer.appendChild(card);

    card.addEventListener("click", () =>
      handleCardClick(card, flipCardInner, icon)
    );
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let flippedCards = [];
let matchedPairs = 0;

function handleCardClick(card, flipCardInner, icon) {
  //   const flipCardInner = document.querySelector(".flip-card-inner");
  if (flippedCards.length >= 2 || flipCardInner.classList.contains("card-flip"))
    return;

  flipCardInner.classList.add("card-flip");
  flippedCards.push({ card, icon, flipCardInner });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const popSound = new Audio("./assets/pop-sound.mp3");
  const failSound = new Audio("./assets/fail-sound.mp3");
  const aplause = new Audio("./assets/applause.mp3");
  if (firstCard.icon === secondCard.icon) {
    popSound.play();
    moves++;
    matches++;
    updateMovesAndMisses();
    setTimeout(() => {
      firstCard.card.classList.add("invisible");
      secondCard.card.classList.add("invisible");
      firstCard.card.innerHTML = "";
      secondCard.card.innerHTML = "";

      matchedPairs++;
      if (matchedPairs === icons.length) {
        aplause.play();
        const resultsContainer = document.querySelector(".results-container");
        resultsContainer.classList.remove("result-hidden");
        resultsContainer.classList.add("result-visible");
        const accuracy = ((matches / (moves + misses)) * 100).toFixed(2);
        document.getElementById("moves-val").innerHTML = moves;
        document.getElementById("matches-val").innerHTML = matches;
        document.getElementById("misses-val").innerHTML = misses;

        document.querySelector(".accuracy-val").style.width = `${accuracy}%`;
        document.querySelector(".accuracy-span-val").innerText = `${accuracy}%`;
      }
    }, 500);
  } else {
    moves++;
    misses++;
    updateMovesAndMisses();
    failSound.play();
    setTimeout(() => {
      firstCard.card
        .querySelector(".flip-card-inner")
        .classList.remove("card-flip");
      secondCard.card
        .querySelector(".flip-card-inner")
        .classList.remove("card-flip");
    }, 1000);
  }

  flippedCards = [];
}

function updateMovesAndMisses() {
  document.getElementById("moves").innerHTML = moves;
  document.getElementById("misses").innerHTML = misses;
  document.getElementById("matches").innerHTML = matches;
}

createGrid();
