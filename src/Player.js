class Player {
  constructor(playerId) {
    this.playerId = playerId;
    this.cards = [];
  }
  // Adds a card to the player's list of cards.
  addCardToPlayer(card) {
    this.cards.push(card);
  }
  // Removes a card from the player's list of cards.
  removeCardFromPlayer(card) {
    const index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }
  // returns the player's playerId.
  getplayerId() {
    return this.playerId;
  }
  // returns the player's list of cards
  getCards() {
    return this.cards;
  }
  // returns a string representation of the player and their cards.
  toString() {
    return this.playerId + " " + this.cards.toString();
  }
}

module.exports = { Player };
