// Day 23
// Blackjack Advanced
// function and class
function giveCard(cardRemain, cardNum) {
  // shuffle the card(Fisher-Yates Shuffle algorithm)
  for (let i = cardRemain.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardRemain[i], cardRemain[j]] = [cardRemain[j], cardRemain[i]];
  }
  // pick card and delete the card in the deck
  let cardPick = [];
  for (let i = 0; i < cardNum; i++) {
    cardPick.push(cardRemain[i]);
  }
  cardRemain.splice(0, cardNum);
  return cardPick;
}
class Player {
  constructor(id) {
    this.id = id;
    this.card = [];
    this.totalValueOfCard = [];
    this.chip = 10;
    this.betSize = 0;
    this.doubleDown = false;
    this.playAgain = true;
  }
  addCardToArr(arr) {
    arr.map((val) => this.card.push(val));
    this.stepCount += 1;
  }
  cardDisplay(num) {
    const suit = ["Hearts", "Diamonds", "Spades", "Clubs"];
    const specialCardName = { 1: "Ace", 11: "J", 12: "Q", 13: "K" };
    const display = this.card.slice(0, num);
    return display.reduce(function (acc, val, index) {
      if (index !== display.length - 1) {
        if ((val % 13) + 1 > 1 && (val % 13) + 1 <= 10) {
          return (
            acc + ((val % 13) + 1) + " of " + suit[Math.floor(val / 13)] + " & "
          );
        } else {
          return (
            acc +
            specialCardName[((val % 13) + 1).toString()] +
            " of " +
            suit[Math.floor(val / 13)] +
            " & "
          );
        }
      } else {
        if ((val % 13) + 1 > 1 && (val % 13) + 1 <= 10) {
          return (
            acc + ((val % 13) + 1) + " of " + suit[Math.floor(val / 13)] + "  "
          );
        } else {
          return (
            acc +
            specialCardName[((val % 13) + 1).toString()] +
            " of " +
            suit[Math.floor(val / 13)] +
            "  "
          );
        }
      }
    }, "");
  }
  valueOfCard() {
    let Ace = 0,
      TwoToTen = [0],
      JQK = 0,
      result;
    this.card.forEach((element) => {
      if ((element % 13) + 1 === 1) {
        Ace += 1;
      } else if ((element % 13) + 1 > 10) {
        JQK += 1;
      } else {
        TwoToTen.push((element % 13) + 1);
      }
    });
    result = Ace * 11 + JQK * 10 + TwoToTen.reduce((acc, val) => acc + val);
    if (result > 21) {
      result = Ace * 1 + JQK * 10 + TwoToTen.reduce((acc, val) => acc + val);
    }
    this.totalValueOfCard[0] = result;
    result > 21
      ? (this.totalValueOfCard[1] = false)
      : (this.totalValueOfCard[1] = true);
    console.log(` Value of the hand is ${this.totalValueOfCard[0]}`);
  }
  bet() {
    let betSize = rs.questionInt(
      `Chip remain : ${this.chip} How much do you want to bet? `
    );
    while (betSize > this.chip) {
      console.log(`You do not have that much of chips`);
      betSize = rs.questionInt(`How much do you want to bet? `);
    }
    this.chip = this.chip - betSize;
    this.betSize += betSize;
    console.log(`Chip remain : ${this.chip}`);
  }
  doubleBet() {
    if (rs.keyInYNStrict(`Do you want to double down?`)) {
      this.doubleDown = true;
      this.bet();
    }
  }
  reset() {
    this.card = [];
    this.totalValueOfCard = [];
    this.doubleDown = false;
    this.betSize = 0;
  }
}
class Dealer {
  constructor() {
    this.card = [];
    this.totalValueOfCard = [];
    this.betSize;
  }
  addCardToArr(arr) {
    arr.map((val) => this.card.push(val));
    this.stepCount += 1;
  }
  cardDisplay(num) {
    const suit = ["Hearts", "Diamonds", "Spades", "Clubs"];
    const specialCardName = { 1: "Ace", 11: "J", 12: "Q", 13: "K" };
    const display = this.card.slice(0, num);
    return display.reduce(function (acc, val, index) {
      if (index !== display.length - 1) {
        if ((val % 13) + 1 > 1 && (val % 13) + 1 <= 10) {
          return (
            acc + ((val % 13) + 1) + " of " + suit[Math.floor(val / 13)] + " & "
          );
        } else {
          return (
            acc +
            specialCardName[((val % 13) + 1).toString()] +
            " of " +
            suit[Math.floor(val / 13)] +
            " & "
          );
        }
      } else {
        if ((val % 13) + 1 > 1 && (val % 13) + 1 <= 10) {
          return (
            acc + ((val % 13) + 1) + " of " + suit[Math.floor(val / 13)] + "  "
          );
        } else {
          return (
            acc +
            specialCardName[((val % 13) + 1).toString()] +
            " of " +
            suit[Math.floor(val / 13)] +
            "  "
          );
        }
      }
    }, "");
  }
  valueOfCard() {
    let Ace = 0,
      TwoToTen = [0],
      JQK = 0,
      result;
    this.card.forEach((element) => {
      if ((element % 13) + 1 === 1) {
        Ace += 1;
      } else if ((element % 13) + 1 > 10) {
        JQK += 1;
      } else {
        TwoToTen.push((element % 13) + 1);
      }
    });
    result = Ace * 11 + JQK * 10 + TwoToTen.reduce((acc, val) => acc + val);
    if (result > 21) {
      result = Ace * 1 + JQK * 10 + TwoToTen.reduce((acc, val) => acc + val);
    }
    this.totalValueOfCard[0] = result;
    result > 21
      ? (this.totalValueOfCard[1] = false)
      : (this.totalValueOfCard[1] = true);
    console.log(` Value of the hand is ${this.totalValueOfCard[0]}`);
  }
  reset() {
    this.card = [];
    this.totalValueOfCard = [];
    this.betSize = null;
  }
}
// interaction with user
let rs = require("readline-sync");
const player1 = new Player(1);
const player2 = new Player(2);
const player3 = new Player(3);
const dealer = new Dealer();
let playerArr = [player1, player2, player3];
let flag = false;
do {
  // new deck of card and initialize the data
  var cardRemain = [];
  for (let i = 0; i < 52; i++) {
    cardRemain.push(i);
  }
  for (let i = 0; i < playerArr.length; i++) {
    playerArr[i].reset();
  }
  dealer.reset();
  flag = false;
  // each player play with dealer
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i].chip <= 0 && playerArr[i].playAgain) {
      console.log(`Player${playerArr[i].id} do not have any chips!! GET OUT`);
    } else if (playerArr[i].playAgain) {
      console.log(`Player${playerArr[i].id}'s Turn : `);
      dealer.reset();
      playerArr[i].bet();
      dealer.betSize = playerArr[i].betSize;
      playerArr[i].addCardToArr(giveCard(cardRemain, 2));
      dealer.addCardToArr(giveCard(cardRemain, 2));
      console.log(
        `Thw cards player${playerArr[i].id} get : ${playerArr[i].cardDisplay(
          2
        )}`
      );
      console.log(`The cards dealer get : ${dealer.cardDisplay(1)}`);
      playerArr[i].valueOfCard();
      if (playerArr[i].chip !== 0) {
        playerArr[i].doubleBet();
        dealer.betSize = playerArr[i].betSize;
      }
      // player
      if (playerArr[i].doubleDown) {
        playerArr[i].addCardToArr(giveCard(cardRemain, 1));
        console.log(`
             The cards Player${playerArr[i].id} get : 
              ${playerArr[i].cardDisplay(playerArr[i].card.length)}
          `);
        playerArr[i].valueOfCard();
        if (!playerArr[i].totalValueOfCard[1]) {
          console.log(
            ` You are bust!! GAME OVER.  Remaining chips Player${playerArr[i].id} have : ${playerArr[i].chip}`
          );
        }
      } else {
        while (rs.keyInYN(" Do you want to hit ?")) {
          playerArr[i].addCardToArr(giveCard(cardRemain, 1));
          console.log(`
               The cards Player${playerArr[i].id} get : 
                ${playerArr[i].cardDisplay(playerArr[i].card.length)}
            `);
          playerArr[i].valueOfCard();
          if (!playerArr[i].totalValueOfCard[1]) {
            console.log(
              ` You are bust!! GAME OVER.  Remaining chips Player${playerArr[i].id} have : ${playerArr[i].chip}`
            );
            break;
          }
        }
      }
      // dealer
      if (playerArr[i].totalValueOfCard[1]) {
        rs.question(` Now! It's Dealer's turn.
 The cards dealer gets : ${dealer.cardDisplay(2)}`);
        dealer.valueOfCard();
        while (dealer.totalValueOfCard[0] < 17 && dealer.totalValueOfCard[1]) {
          dealer.addCardToArr(giveCard(cardRemain, 1));
          console.log(
            " The cards dealer gets : " + dealer.cardDisplay(dealer.card.length)
          );
          dealer.valueOfCard();
        }
        if (dealer.totalValueOfCard[1]) {
          if (dealer.totalValueOfCard[0] > playerArr[i].totalValueOfCard[0]) {
            console.log(
              ` Player${playerArr[i].id} lose !! Remaining chips you have : ${playerArr[i].chip}`
            );
          } else if (
            dealer.totalValueOfCard[0] === playerArr[i].totalValueOfCard[0]
          ) {
            playerArr[i].chip += dealer.betSize;
            console.log(
              `Tie. Remaining chips Player${playerArr[i].id} have : ${playerArr[i].chip}`
            );
          } else {
            playerArr[i].chip += dealer.betSize * 2;
            console.log(
              ` Congratulation !! Player${playerArr[i].id} win. Remaining chips Player${playerArr[i].id} have : ${playerArr[i].chip}`
            );
          }
        } else {
          playerArr[i].chip += dealer.betSize * 2;
          console.log(
            ` Congratulation !! Player${playerArr[i].id} win. Remaining chips Player${playerArr[i].id} have : ${playerArr[i].chip}`
          );
        }
      }
    }
  }
  // check if player want to play again
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i].playAgain && playerArr[i].chip > 0) {
      playerArr[i].playAgain = rs.keyInYNStrict(
        `Do Player${playerArr[i].id} want to play again? `
      );
    }
    if (playerArr[i].playAgain && playerArr[i].chip > 0) {
      flag = true;
    }
  }
  let checkPlayer = playerArr.reduce((acc, boo) => acc + boo.playAgain);
  if (checkPlayer === 0) {
    break;
  }
} while (flag);
// summary
for (let i = 0; i < playerArr.length; i++) {
  console.log(
    `Player${playerArr[i].id} has  ${playerArr[i].chip} chips in the end.`
  );
}
