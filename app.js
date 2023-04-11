const Game = require("./src/Game");

// require the readline module to prompt user input from the terminal
const readline = require("readline");
// create a readline interface object to read input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// prompt the user input for number of players
async function prompt() {
  return new Promise((resolve) => {
    rl.question(
      "Enter the number of players, must be at least 2 and at most 4: ",
      (numberOfPlayers) => {
        // close the readline interface
        rl.close();
        // resolve the promise with the input number of players
        resolve(numberOfPlayers);
      }
    );
  });
}

async function runGame() {
  try {
    let numberOfPlayers = await prompt();
    numberOfPlayers = Number(numberOfPlayers);
    // starts the game by creating a new instance of the Game class and calling its startGame() method.
    const game = new Game();
    game.startGame(numberOfPlayers);
  } catch (error) {
    console.error(error);
  }
}

// run the game
runGame();
