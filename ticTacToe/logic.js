let tracker = true;
const gameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

$(document).ready(function(){
  // Part 1: Setup - Clicks in each square should show "X" and "O" on the board
  // It can be assumed that each click will alternate "X" and "O", imitating that 2 people are playing the game


  $("#board td").click(function(e) {
    console.log('id: ', e.target.innerHTML);

    // get element's column and row for gameBoard variable
    let value, row, column;
    row = $(e.target).attr("id")[0] - 1;
    column = $(e.target).attr("id")[1] - 1;

    // check if someone has already clicked this square
    // give user feedback
    if (e.target.innerHTML.length > 0) {
      $("#game-status").html("Square has already been clicked")
                       .css("color", "red");
      setTimeout(() => {
        $("#game-status").html("Game in progress...")
                         .css("color", "black");
      }, 500);
      return;
    }

    // assign X & O to html element
    if (tracker) {
      value = 1;
      $(e.target).html("X");
      gameBoard[row][column] = 1;
     } else {
      value = -1;
      $(e.target).html("O");
      gameBoard[row][column] = -1;
     }

     // toggle X & O
     if (tracker) {tracker = false}
     else tracker = true;

    // Check if someone has won
    victoryCheck(value, row, column);
  });

  // Part 2: Logic - determine if there is a winner after each action, or if there is a draw at the end of the game

  function clearBoard() {
    console.log("calling clear board");
    for (let x = 0; x < gameBoard.length; x++) {
      console.log('x: ', x);
      for (let y = 0; y < gameBoard[x].length; y++) {
        console.log("x: ", x, " y: ", y)
        gameBoard[x][y] = 0;
        console.log("gameBoard: ", gameBoard);
      }
    }
  }

  const victoryTrue = () => {
    $("#game-status").html("YOU WIN!!!")
                     .css("color", "blue");
    tracker = true;
    clearBoard();
    setTimeout(() => {
      $("#game-status").html("Game in Progress")
                     .css("color", "black");
      $("td").empty();
    }, 500)
    return
  }

  const catsGame = () => {
    for (row in gameBoard) {
      for (square in gameBoard[row]) {
        //console.log("row: ", row, "square: ", square);
        if (gameBoard[row][square] === 0) {
          return;
        }
      }
    }

    $("#game-status").html("YOU TIED!!!")
                   .css("color", "green");

    clearBoard();
    tracker = true;
    setTimeout(() => {
      $("#game-status").html("Game in Progress")
                     .css("color", "black");
      $("td").empty();
    }, 500)
    return;
  }

  const victoryCheck = (value, row, column) => {
    //console.log("value: ", value, " row: ", row, " column: ", column, " gameBoard: ", gameBoard);
    let tracker = 0;

    /* HORIZONTAL WIN */
    for (let square of gameBoard[row]) {

      if (square !== value) {
        console.log("No horizontal victory");
        break;
      } else { tracker += 1; }

      if (tracker === gameBoard[row].length) {
        victoryTrue();
        return;
      }
    }

    /* VERTICAL WIN */
    tracker = 0;
    for (let x = 0; x < gameBoard.length; x++) {
      let square = gameBoard[x][column];
      if (square !== value) {
        console.log("No vertical victory");
        break;
      } else { tracker += 1; }

      if (tracker === gameBoard.length) {
        victoryTrue();
        return;
      }
    }

    /* DIAGONAL WIN */
    // diagonal solutions are hard-coded
    // functional solution would work by..... (find solution)
    if ((row === 0 && column === 0) || (row === 2 && column === 2)) {
      if ((gameBoard[0][0] === value) && (gameBoard[1][1] === value) && (gameBoard[2][2] === value)) {
        victoryTrue();
        return;
      }
    } else if ((row === 2 && column === 0) || (row === 0 && column === 2)) {
      if ((gameBoard[0][2] === value) && (gameBoard[1][1] === value) && (gameBoard[2][0] === value)) {
        victoryTrue();
        return;
      }
    } else if (row === 1 && column === 1) {
      if ((gameBoard[0][0] === value && gameBoard[2][2] === value) ||
        (gameBoard[0][2] === value && gameBoard[2][0] === value)) {
          victoryTrue();
          return;
        }
    }
    console.log("no diagonal victory");

    /* CATS GAME */
    // Note: solution inneficient, just want to wrap this up before work day ends
    catsGame();
  }
});
