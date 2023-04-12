const Game = require("../src/Game");
const { Deck } = require("../src/Deck");
const expect = require("chai").expect;
const assert = require("chai").assert;
function testGame() {
  describe("Play Game", () => {
    describe("Validating user input", function () {
      it("should throw an error if number of players is less than 2", function () {
        const game = new Game();
        assert.throw(
          function () {
            game.startGame(1);
          },
          Error,
          "Invalid number entered. Please choose a number between 2 and 4."
        );
      });

      it("should throw an error if number of players is more than 4", function () {
        const game = new Game();
        assert.throw(
          function () {
            game.startGame(5);
          },
          Error,
          "Invalid number entered. Please choose a number between 2 and 4."
        );
      });
    });

    describe("constructor()", () => {
      it("should create a new Game object with empty properties", () => {
        const game = new Game();
        assert.deepStrictEqual(game.deck, []);
        assert.deepStrictEqual(game.players, []);
        assert.deepStrictEqual(game.drawPile, []);
        assert.deepStrictEqual(game.discardPile, []);
      });
    });

    describe("Create Deck", () => {
      it("should create a deck with 52 cards", () => {
        const deck = new Deck().getDeck();
        expect(deck.length).equal(52);
      });

      it("should have unique cards", () => {
        const deck = new Deck().getDeck();
        const set = new Set(deck.map((card) => card.toString()));
        expect(set.size).equal(52);
      });
    });

    describe("dealCards()", () => {
      it("should deal 5 cards to each player", () => {
        const game = new Game();
        game.deck = new Deck().getDeck();
        game.dealsCard(2);
        expect(game.players[0].getCards().length).equal(5);
        expect(game.players[1].getCards().length).equal(5);
      });

      it("should remove dealt cards from the deck", () => {
        const game = new Game();
        game.deck = new Deck().getDeck();
        game.dealsCard(2);
        const set = new Set(game.deck.map((card) => card.toString()));
        expect(set.size).equal(42);
      });
    });

    describe("getNextPlayer()", () => {
      it("should handle negative currentPlayer values", () => {
        const game = new Game();
        const currentPlayer = -1;
        const numberOfPlayers = 3;
        const nextPlayer = game.getNextPlayer(currentPlayer, numberOfPlayers);
        expect(nextPlayer).equal(2);
      });
    });
  });
}
module.exports = { testGame };
