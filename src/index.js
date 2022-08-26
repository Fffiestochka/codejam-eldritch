import ancientsData from '../src/data/ancients.js';
import cardsDataBlue from '../src/data/mythicCards/blue/index';
import cardsDataBrown from '../src/data/mythicCards/brown/index';
import cardsDataGreen from '../src/data/mythicCards/green/index';
import cardBack from '../src/assets/mythicCardBackground.jpg';
//========== ancients
const ancients = document.querySelector('.ancients');
let scheme = [];
const ancientCards = Array.from(document.querySelectorAll('.ancient'));
const green1 = document.querySelector('.green1');
const brown1 = document.querySelector('.brown1');
const blue1 = document.querySelector('.blue1');
const green2 = document.querySelector('.green2');
const brown2 = document.querySelector('.brown2');
const blue2 = document.querySelector('.blue2');
const green3 = document.querySelector('.green3');
const brown3 = document.querySelector('.brown3');
const blue3 = document.querySelector('.blue3');
let totalGreen;
let totalBrown;
let totalBlue;
//============== другие DOM-элементы
const start = document.querySelector('.start');
const result = document.querySelector('.result');
const frontImg = document.querySelector('.front-img');
const back = document.querySelector('.back');

const easiest = document.querySelector('.easiest');
const easy = document.querySelector('.easy');
const normal = document.querySelector('.normal');
const hard = document.querySelector('.hard');

let blueRandom = cardsDataBlue.sort(shuffleArrayRandom);
let brownRandom = cardsDataBrown.sort(shuffleArrayRandom);
let greenRandom = cardsDataGreen.sort(shuffleArrayRandom);

let st1blue;
let st2blue;
let st3blue;
let st1brown;
let st2brown;
let st3brown;
let st1green;
let st2green;
let st3green;

let selectedGreenCards; // массив объектов
let selectedBrownCards;
let selectedBlueCards;

let little1GreenDeck;
let little2GreenDeck;
let little3GreenDeck;

let little1BrownDeck;
let little2BrownDeck;
let little3BrownDeck;

let little1BlueDeck;
let little2BlueDeck;
let little3BlueDeck;

let selected1StDeck = []; // массив из массивов с объектами
let selected2StDeck = [];
let selected3StDeck = [];

let totalSelectedDeck;

ancients.addEventListener('click', (e) => {
  let choosedCardName = e.target.className.split(' ')[0]; // cthulhu

  ancientCards.forEach((ancientCard) => {
    ancientCard.classList.remove('active');
  });
  e.target.classList.add('active');

  let ancientObj = ancientsData.filter((obj) => obj.id === choosedCardName);

  scheme = [
    ancientObj[0].firstStage,
    ancientObj[0].secondStage,
    ancientObj[0].thirdStage,
  ];

  green1.textContent = scheme[0].greenCards;
  brown1.textContent = scheme[0].brownCards;
  blue1.textContent = scheme[0].blueCards;
  green2.textContent = scheme[1].greenCards;
  brown2.textContent = scheme[1].brownCards;
  blue2.textContent = scheme[1].blueCards;
  green3.textContent = scheme[2].greenCards;
  brown3.textContent = scheme[2].brownCards;
  blue3.textContent = scheme[2].blueCards;

  totalGreen = +green1.textContent + +green2.textContent + +green3.textContent;
  totalBrown = +brown1.textContent + +brown2.textContent + +brown3.textContent;
  totalBlue = +blue1.textContent + +blue2.textContent + +blue3.textContent;
});

start.addEventListener('click', () => {
  start.classList.add('active');
  result.classList.add('active');
  back.src = cardBack;

  selectCards();
  splitAllSelectedCardsByStages();
  createLittleColorDecks();
  createTotalSelectedDeck();
});

function shuffleArrayRandom(a, b) {
  return Math.random() - 0.5;
}

function createCardDeck(length, array) {
  let newArr = [];
  while (newArr.length < length) {
    newArr.push(array.pop());
  }
  return newArr;
}

function splitColorByStage(stage, color) {
  const stColor = scheme[stage - 1][`${color}Cards`];
  return stColor;
}

function splitAllSelectedCardsByStages() {
  st1blue = splitColorByStage(1, 'blue');
  st2blue = splitColorByStage(2, 'blue');
  st3blue = splitColorByStage(3, 'blue');
  st1brown = splitColorByStage(1, 'brown');
  st2brown = splitColorByStage(2, 'brown');
  st3brown = splitColorByStage(3, 'brown');
  st1green = splitColorByStage(1, 'green');
  st2green = splitColorByStage(2, 'green');
  st3green = splitColorByStage(3, 'green');
}

function selectCards() {
  selectedGreenCards = createCardDeck(totalGreen, greenRandom);
  selectedBrownCards = createCardDeck(totalBrown, brownRandom);
  selectedBlueCards = createCardDeck(totalBlue, blueRandom);
}

function create1StageDeck() {
  if (little1GreenDeck.length > 0) {
    selected1StDeck = selected1StDeck.concat(little1GreenDeck);
  }
  if (little1BrownDeck.length > 0) {
    selected1StDeck = selected1StDeck.concat(little1BrownDeck);
  }
  if (little1BlueDeck.length > 0) {
    selected1StDeck = selected1StDeck.concat(little1BlueDeck);
  }
  selected1StDeck.sort(shuffleArrayRandom);
}

function create2StageDeck() {
  if (little2GreenDeck.length > 0) {
    selected2StDeck = selected2StDeck.concat(little2GreenDeck);
  }
  if (little2BrownDeck.length > 0) {
    selected2StDeck = selected2StDeck.concat(little2BrownDeck);
  }
  if (little2BlueDeck.length > 0) {
    selected2StDeck = selected2StDeck.concat(little2BlueDeck);
  }
  selected2StDeck.sort(shuffleArrayRandom);
}

function create3StageDeck() {
  if (little3GreenDeck.length > 0) {
    selected3StDeck = selected3StDeck.concat(little3GreenDeck);
  }
  if (little3BrownDeck.length > 0) {
    selected3StDeck = selected3StDeck.concat(little3BrownDeck);
  }
  if (little3BlueDeck.length > 0) {
    selected3StDeck = selected3StDeck.concat(little3BlueDeck);
  }
  selected3StDeck.sort(shuffleArrayRandom);
}

function createLittleColorDecks() {
  little1GreenDeck = createCardDeck(st1green, selectedGreenCards);
  little2GreenDeck = createCardDeck(st2green, selectedGreenCards);
  little3GreenDeck = createCardDeck(st3green, selectedGreenCards);

  little1BrownDeck = createCardDeck(st1brown, selectedBrownCards);
  little2BrownDeck = createCardDeck(st2brown, selectedBrownCards);
  little3BrownDeck = createCardDeck(st3brown, selectedBrownCards);

  little1BlueDeck = createCardDeck(st1blue, selectedBlueCards);
  little2BlueDeck = createCardDeck(st2blue, selectedBlueCards);
  little3BlueDeck = createCardDeck(st3blue, selectedBlueCards);
}

function createTotalSelectedDeck() {
  create1StageDeck();
  create2StageDeck();
  create3StageDeck();

  totalSelectedDeck = new Array(
    selected1StDeck,
    selected2StDeck,
    selected3StDeck
  );
}

back.addEventListener('click', () => {
  let card;
  let cardColor;
  let cardFace;
  if (totalSelectedDeck[0].length > 0) {
    card = totalSelectedDeck[0].pop();
    cardColor = card.color;
    console.log(cardColor);
    cardFace = card.cardFace;
    frontImg.src = cardFace;

    if (cardColor === 'green') {
      green1.textContent = green1.textContent - 1;
    } else if (cardColor === 'brown') {
      brown1.textContent = brown1.textContent - 1;
    } else if (cardColor === 'blue') {
      blue1.textContent = blue1.textContent - 1;
    }
  } else if (totalSelectedDeck[1].length > 0) {
    card = totalSelectedDeck[1].pop();
    cardColor = card.color;
    cardFace = card.cardFace;
    frontImg.src = cardFace;

    if (cardColor === 'green') {
      green2.textContent = green2.textContent - 1;
    } else if (cardColor === 'brown') {
      brown2.textContent = brown2.textContent - 1;
    } else if (cardColor === 'blue') {
      blue2.textContent = blue2.textContent - 1;
    }
  } else if (totalSelectedDeck[2].length > 0) {
    card = totalSelectedDeck[2].pop();
    cardColor = card.color;
    cardFace = card.cardFace;
    frontImg.src = cardFace;

    if (cardColor === 'green') {
      green3.textContent = green3.textContent - 1;
    } else if (cardColor === 'brown') {
      brown3.textContent = brown3.textContent - 1;
    } else if (cardColor === 'blue') {
      blue3.textContent = blue3.textContent - 1;
    }
  } else {
    frontImg.style.display = 'none';
  }
});
