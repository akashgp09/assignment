const expect = require("chai").expect;
const { Player } = require("../src/Player");
const { Card } = require("../src/Card");
function testPlayer() {
  describe("Player", () => {
    describe("addCardToPlayer()", () => {
      it("should add a card to the player's list of cards", () => {
        const player = new Player("Player 1");
        const card = new Card(10, "HEARTS");
        player.addCardToPlayer(card);
        expect(player.getCards()).contain(card);
      });
    });

    describe("removeCardFromPlayer()", () => {
      it("should remove a card from the player's list of cards", () => {
        const player = new Player("Player 1");
        const card = new Card(10, "HEARTS");
        player.addCardToPlayer(card);
        player.removeCardFromPlayer(card);
        expect(player.getCards()).not.contain(card);
      });
    });

    describe("getplayerId()", () => {
      it("should return the player's playerId", () => {
        const player = new Player("Player 1");
        expect(player.getplayerId()).equal("Player 1");
      });
    });

    describe("getCards()", () => {
      it("should return the player's list of cards", () => {
        const player = new Player("Player 1");
        const card1 = new Card(10, "HEARTS");
        const card2 = new Card(11, "DIAMONDS");
        player.addCardToPlayer(card1);
        player.addCardToPlayer(card2);
        expect(player.getCards()).contain(card1);
        expect(player.getCards()).contain(card2);
      });
    });
  });
}
module.exports = { testPlayer };
