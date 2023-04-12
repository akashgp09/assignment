const { Deck } = require("../src/Deck");
const expect = require("chai").expect;
function testDeck() {
  describe("Deck", () => {
    describe("constructor()", () => {
      it("should create a deck with 52 cards", () => {
        const deck = new Deck();
        expect(deck.getDeck().length).equal(52);
      });
    });

    describe("shuffle()", () => {
      it("should shuffle the deck of cards", () => {
        const deck = new Deck();
        const firstCardBeforeShuffle = deck.getDeck()[0];
        deck.shuffle();
        const firstCardAfterShuffle = deck.getDeck()[0];
        expect(firstCardBeforeShuffle).not.equal(firstCardAfterShuffle);
      });
    });
  });
}

module.exports = { testDeck };
