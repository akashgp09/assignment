const Deck = require("./Deck").Deck;
const Player = require("./Player").Player;

class Game {
  constructor() {
    this.deck = []; // the deck of cards
    this.players = []; // array to hold all the players
    this.drawPile = []; // array to hold the draw pile
    this.discardPile = []; // array to hold the discard pile
  }
  dealsCard(numberOfPlayers) {
    // add 5 cards to each player's hand
    for (let i = 1; i <= numberOfPlayers; i++) {
      const p = new Player(i);
      for (let j = 1; j <= 5; j++) {
        p.addCardToPlayer(this.deck[this.deck.length - 1]);
        this.deck.pop();
      }
      this.players.push(p);
    }
  }

  /* calculate the index of the current player. 
     This is done by taking the remainder of the currentPlayer variable
     and the number of players in the game. If the currentPlayer is negative,
     then add the number of players to it. This is done to ensure that the currentPlayer variable is always positive
  */
  getNextPlayer(currentPlayer, numberOfPlayers) {
    currentPlayer %= numberOfPlayers;
    if (currentPlayer < 0) currentPlayer += numberOfPlayers;
    currentPlayer %= numberOfPlayers;
    return currentPlayer;
  }

  startGame(numberOfPlayers) {
    //  if number of players is greater than 4 or less than 2, an error message will be displayed and the program will terminate.
    if (numberOfPlayers < 2 || numberOfPlayers > 4) {
      throw new Error(
        "Invalid number entered. Please choose a number between 2 and 4."
      );
    }
    // create a new deck object and get the deck of cards
    this.deck = new Deck().getDeck();

    this.dealsCard(numberOfPlayers);

    // push the top card of the deck to the discard pile and remove it from the deck
    this.discardPile.push(this.deck[0]);
    this.deck.shift();

    // add the remaining cards from the deck to the draw pile
    for (const c of this.deck) {
      this.drawPile.push(c);
    }

    let currentPlayer = 0;
    let direction = 1; // set the direction of the game to clockwise
    let cardsToDraw = 1; //  the number of cards to take from the draw pile to 1

    // loop to continue the game until it is over
    while (true) {
      // check if there are enough cards in the draw pile for the player to draw, if not, the game ends in a draw.
      if (this.drawPile.length < cardsToDraw) {
        console.log("The game has ended in a draw.");
        break;
      }

      currentPlayer = this.getNextPlayer(currentPlayer, numberOfPlayers);

      // a boolean variable to keep track of whether the current player has matched any cards with the discard pile or not
      let cardMatched = false;
      // a variable to keep track of the number of the matched card.
      let cardMatchedNumber = -1;
      // get the top card of the discard pile.
      const discardPileTopCard = this.discardPile[this.discardPile.length - 1];
      console.log(`The top card on the discard pile is ${discardPileTopCard}`);

      for (const currentPlayerCard of this.players[currentPlayer].getCards()) {
        // check if the current player's card matches the top card of the discard pile.
        if (
          currentPlayerCard.getRank() == discardPileTopCard.getRank() ||
          currentPlayerCard.getSuit() == discardPileTopCard.getSuit()
        ) {
          // Check if the top card of the discard pile is an action card (ACE, JACK, QUEEN, or KING).
          if (
            discardPileTopCard.getRank() == 1 ||
            discardPileTopCard.getRank() == 11 ||
            discardPileTopCard.getRank() == 12 ||
            discardPileTopCard.getRank() == 13
          ) {
            /* If the current player's card is an action card, and its number matches the top card of
               the discard pile, then continue to the next iteration of the loop without executing any
               code in the current iteration. As actions are not stackable. 
            */
            if (currentPlayerCard.getRank() == discardPileTopCard.getRank())
              continue;
          }

          // the current player's card matches the top card of the discard pile
          console.log(
            `Player ${this.players[
              currentPlayer
            ].getplayerId()} played a matching card. New top card: ${currentPlayerCard}`
          );
          //  check if the current player needs to draw more than one card, depending on the action card played by the previous player.
          if (cardsToDraw > 1) {
            while (cardsToDraw-- > 0) {
              console.log(
                `Player ${this.players[
                  currentPlayer
                ].getplayerId()} drew a card: ${
                  this.drawPile[this.drawPile.length - 1]
                }`
              );

              // putting the card into the current player's hand and removing it from the discard pile.
              this.players[currentPlayer].addCardToPlayer(
                this.drawPile[this.drawPile.length - 1]
              );
              this.drawPile.pop();
            }
            cardsToDraw = 1;
          }
          // remove matched card from player's hand and add it to the discard pile
          this.players[currentPlayer].removeCardFromPlayer(currentPlayerCard);
          this.discardPile.push(currentPlayerCard);
          cardMatched = true;
          cardMatchedNumber = currentPlayerCard.getRank();
          break;
        }
      }

      // If the player did not match the top card in the discard pile, then they need to take a card from the draw pile.
      if (cardMatched === false) {
        console.log(
          `No cards match for player ${this.players[
            currentPlayer
          ].getplayerId()}. Must draw ${cardsToDraw} card from the draw pile`
        );

        //  number of cards that is to be drawn by the player, depending on the action card played by the previous player.
        while (cardsToDraw-- > 0) {
          console.log(
            `Player ${this.players[currentPlayer].getplayerId()} drew a card: ${
              this.drawPile[this.drawPile.length - 1]
            }`
          );
          this.players[currentPlayer].addCardToPlayer(
            this.drawPile[this.drawPile.length - 1]
          );
          this.drawPile.pop();
        }
        cardsToDraw = 1;
      }
      // If the player has matched a card and has no more cards left in their hand, then they have won the game.
      else if (
        cardMatched === true &&
        this.players[currentPlayer].getCards().length === 0
      ) {
        console.log(
          `Player ${this.players[
            currentPlayer
          ].getplayerId()} has won the game! Congratulations!`
        );
        // exits the program.
        process.exit(0);
      }
      //  If the player has matched an ACE card, then the next player's turn will be skipped.
      else if (cardMatched === true && cardMatchedNumber === 1) {
        currentPlayer += direction; // Determines the next player's turn according to the direction.
      }
      // If the player has matched a KING card, then the direction of the game will be reversed.
      else if (cardMatched === true && cardMatchedNumber === 13) {
        direction *= -1;
      }
      // if the player has matched a QUEEN card, then the next player needs to draw 2 cards.
      else if (cardMatched === true && cardMatchedNumber === 12) {
        cardsToDraw = 2;
      }
      // if the player has matched a JACK card, then the next player needs to draw 4 cards.
      else if (cardMatched === true && cardMatchedNumber === 11) {
        cardsToDraw = 4;
      }
      // to determine the next player whose gonna play.
      currentPlayer += direction;
      console.log("----------------------------------------------------");
    }
  }
}

module.exports = Game;
