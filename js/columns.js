countNQueensSolutions = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  if (n % 2 === 0) {
    var nIs = 'even';
    var nHalf = n / 2;
  } else {
    var nIs = 'odd';
    var nHalf = Math.floor(n / 2);
  }


  var getAttackedSquares = function(rowIndex, colIndex, addOrRemove) {

    //addOrRemove(squares);
    this.storageSquares = {};
    var squares = [];
    var stringifiedQueenSquare = '[' + JSON.stringify(rowIndex) + ',' + JSON.stringify(colIndex) + ']';

    if (this.storageSquares[stringifiedQueenSquare]) {
      squares = this.storageSquares[stringifiedQueenSquare];
    } else {
      //Columns
      for (var i = rowIndex + 1; i < n; i++) {
        squares.push(JSON.stringify([i,colIndex]));
      }
      //Major diagonals
      var targetColumn = colIndex + 1;
      for (var targetRow = rowIndex + 1; targetRow < n && targetColumn < n; targetRow++) {
        squares.push(JSON.stringify([targetRow,targetColumn]));
        targetColumn++;
      }

      //Minor diagonals
      targetColumn = colIndex - 1;
      for (targetRow = rowIndex + 1; targetRow < n && targetColumn >= 0; targetRow++) {
        squares.push(JSON.stringify([targetRow,targetColumn]));
        targetColumn--;
      }

      this.storageSquares[stringifiedQueenSquare] = squares;
    }

    addOrRemove(squares);

  };

  var addSquaresToAttackedSquares = function (squares) {
    for (var i = 0, l = squares.length; i < l; i += 1) {

      if (!alreadyAttackedSquares[squares[i]]) {
        alreadyAttackedSquares[squares[i]] = 1;
      } else {
        alreadyAttackedSquares[squares[i]] += 1;
      }
    }
  };

  var removeSquaresFromAttackedSquares = function (squares) {
    for (var i = 0, l = squares.length; i < l; i += 1) {

      alreadyAttackedSquares[squares[i]] -= 1;
    }
  };

  var boardsCounter = 0;
  var placedQueens = 0;
  var alreadyAttackedSquares = {};


  var iterateOverRow = function (row, stop) {
    var columnCheck;
    var column;
    // debugger;
    stop !== undefined ? columnCheck = stop + 1 : columnCheck = n;
    stop !== undefined ? column = stop : column = 0;
    console.log('columnCheck: ' + columnCheck);

    var row = row || 0;

    while (column < columnCheck) {
      var square = JSON.stringify([row, column]);
      if (!alreadyAttackedSquares[square]) {
        placedQueens++;

        if (placedQueens === n) {
          boardsCounter++;
        }

        getAttackedSquares(row, column, addSquaresToAttackedSquares);

        if ((row + 1) < n) {
          iterateOverRow(row+1);
        }

        placedQueens--;
        getAttackedSquares(row, column, removeSquaresFromAttackedSquares);
      }

      column++;
      if (row === 0 && column === nHalf) {
        if (nIs === 'even') {
          boardsCounter = boardsCounter * 2;
          return;
        } else {
          var nHalfBoards = boardsCounter;
        }
      } else if (row === 0 && column === (nHalf + 1)) {
        boardsCounter = nHalfBoards + boardsCounter;
        return;
      }
    }
    return;
  };

  iterateOverRow(0, 0);

  return boardsCounter;

};

console.log(countNQueensSolutions(5));

//first column = 2
//