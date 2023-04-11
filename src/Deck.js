const Card = require("./Card").Card;
const Suits = {
  HEARTS: "HEARTS",
  SPADES: "SPADES",
  CLUBS: "CLUBS",
  DIAMONDS: "DIAMONDS",
};
class Deck {
  constructor() {
    this.deck = [];
    // Generating the deck of cards
    for (const suits of Object.values(Suits)) {
      for (let rank = 1; rank <= 13; rank++) {
        this.deck.push(new Card(rank, suits));
      }
    }
    // Shuffling the deck after generating
    this.shuffle();
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
  // returns the deck of cards
  getDeck() {
    return this.deck;
  }
}

module.exports = { Deck };
