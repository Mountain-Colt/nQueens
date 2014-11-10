var countSolutions = require('./mainMain.js').countSolutions;
var makeFlags = require('./mainMain.js').makeFlags;
var makeAttackedSquareRows = require('./mainMain.js').makeAttackedSquareRows;

// n will indicate the number of rows, columns, and queens we will calucate 
// solutions for. A solution consists of a board in which n queens have been placed 
// and none of the are attacking any other one
var n = Number(process.argv[2]);
// This implementation of n-queens is designed to be distributed into multiple processes. At 
// a high level, this countSolutions algorithm is placing a queen on the `top row` of the board 
// (which of course we are simply representing by a binary digit of 0's that is length n) and then 
// recursively calling countSolutions again for the next row, passing in the board state created 
// by having already placed a queen on the first row. What this means, is that by beginning at the 
// first row, we have a single process that calculates all possible solutions.

// In order to distribute the work, the user can decide at which row they would like start making calls 
// to the main algorithm. This implementation will calculate all possible board states up to the 
// requested row, and then make a call to countSolutions for each of these board states.

// For example, consider if n === 4 and we start at the second row (row index of 1). Because there 
// are 4 possible places that a queen could be placed on the first row, countSolutions is called 4 
// times, each passing in a different board state based on where the queen was placed on the first row.
// If we began at the third row (row index 2) then there would be 4 possible plays on the first row
// as well as 4 possible plays at the second row for each of these first 4 plays and therefore 16 
// calls to countSolutions, each beginning at the 3rd row and being passed in the board state for one
// of the 16 possibilities.

// I hope this makes clear that the number of processes invoked is equal to n^rowToStartAtIndex. 
// If n is 4 and we start at row index 0, there is 1 process. If n is 4 and we start at row index 1 
// there are 4 processes etc.
var rowToStartAt = Number(process.argv[3]);

var run = function(n, rowToStartAt){
  rowToStartAt = rowToStartAt || 0;
  nIsEven = n % 2 === 0;
  halfOfN = Math.floor(n / 2);
  var check = (1 << n) - 1;
  var flags = makeFlags(n);
  var total = 0;


  for(var i = 0; i < halfOfN; i++){
    var magicFunction = function(rowNumber, attackedSquareRows, flags){
      if( !rowToStartAt ){
        return;
      }
      var check = (1 << n) - 1;
      var row = 0;
      for(var i = 0; i < attackedSquareRows.length; i++){
        row |= attackedSquareRows[i][rowNumber];
      }
      for(var j = 0; j < n; j++){
        var flag = flags[j];
        if( !(flag & row) ){
          moreAttackedSquareRows = makeAttackedSquareRows(flag, n, rowNumber, check)
          attackedSquareRows.push(moreAttackedSquareRows);
          if( rowNumber === rowToStartAt ){
            var columnTotal = countSolutions(n, rowToStartAt + 1, attackedSquareRows, flags, check, j, rowToStartAt);
            console.log('columnTotal: ' + columnTotal);
            total += columnTotal;
          }else{
            magicFunction(rowNumber + 1, attackedSquareRows, flags);
          }
          attackedSquareRows.pop();
        }
      }
    };
    var attackedSquareRows = [];
    attackedSquareRows.push(makeAttackedSquareRows(flags[i], n, 0, check));

    magicFunction(1, attackedSquareRows, flags);

  }

  if( nIsEven ){
    total *= 2;
  }else{
    var attackedSquareRows = [];
    attackedSquareRows.push(makeAttackedSquareRows(flags[halfOfN], n, 0, check));
    var outerColumnTotal = total * 2;
    total = 0;
    magicFunction(1, attackedSquareRows, flags);

    total = total + outerColumnTotal;
  }
  console.log('total: ' + total);
  return total;
};

run(n, rowToStartAt);