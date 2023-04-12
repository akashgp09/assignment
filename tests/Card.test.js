const assert = require("chai").assert;
const Card = require("../src/Card").Card;
function testCard() {
  describe("Card", function () {
    describe("getRank()", function () {
      it("should return the rank of the card", function () {
        const card = new Card(2, "HEARTS");
        assert.equal(card.getRank(), 2);
      });
    });

    describe("getSuit()", function () {
      it("should return the suit of the card", function () {
        const card = new Card(2, "HEARTS");
        assert.equal(card.getSuit(), "HEARTS");
      });
    });

    describe("toString()", function () {
      it("should return a string representation of the card", function () {
        const card = new Card(2, "HEARTS");
        assert.equal(card.toString(), "2 of HEARTS");
      });
    });
  });
}
module.exports = { testCard };
