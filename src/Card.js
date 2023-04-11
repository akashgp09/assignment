const cardName = {
  1: "ACE",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "JACK",
  12: "QUEEN",
  13: "KING",
};
class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  // Getter methods to get the rank and suit of a card.
  getRank() {
    return this.rank;
  }
  getSuit() {
    return this.suit;
  }

  // returns a string representation of the card object
  toString() {
    return `${cardName[this.rank]} of ${this.suit}`;
  }
}

module.exports = { Card };
