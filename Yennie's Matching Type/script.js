/* ============================
   LOBBY START BUTTON
============================ */

const lobby = document.getElementById("lobby");
const startBtn = document.getElementById("startBtn");

// FIX: Make sure the button receives the click, not the image
if (startBtn) {
  startBtn.addEventListener("click", () => {
    lobby.style.display = "none"; // hide lobby and start the game
  });
}


/* ============================
   MATCHING GAME LOGIC
============================ */

// Matching pairs
const matches = {
  1: 10,
  10: 1,
  2: 7,
  7: 2,
  4: 6,
  6: 4,
  3: 5,
  5: 3,
  8: 9,
  9: 8
};

const cards = document.querySelectorAll(".card");
let flippedCards = [];
let lockBoard = false;
let matchedCount = 0;

// Assign numbers & click events
cards.forEach((card, index) => {
  card.dataset.number = index + 1;

  card.addEventListener("click", () => {
    if (lockBoard) return;
    if (card.classList.contains("flip")) return;

    card.classList.add("flip");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  });
});


/* ============================
   CHECK MATCH FUNCTION
============================ */

function checkMatch() {
  lockBoard = true;

  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  const num1 = parseInt(card1.dataset.number);
  const num2 = parseInt(card2.dataset.number);

  // Correct match
  if (matches[num1] === num2) {
    flippedCards = [];
    lockBoard = false;

    matchedCount++;

    // All 5 pairs matched → show ending popup
    if (matchedCount === 5) {
      endPopup.style.display = "flex";
    }

  } else {
    // Wrong match → flip back
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}


/* ============================
   END POPUP
============================ */

const endPopup = document.getElementById("endPopup");
const closePopup = document.getElementById("closePopup");

closePopup.addEventListener("click", () => {
  endPopup.style.display = "none";
});
