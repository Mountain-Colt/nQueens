var makeFlags = function(n){
  var flags = [];
  for(var i = 0; i < n; i++){
    flags.push(1 << i);
  }
  return flags;
};


var makeAttackedSquareRows = function(flag, n, currentRowNumber, check){
  var rows = [];
  while(rows.length < currentRowNumber){
    rows.push(0);
  }
  var numberOfRowsDown = 0;
  for(var i = 0; i < n - currentRowNumber; i++){
    newRow = flag | ( ((flag << numberOfRowsDown) < check ? (flag << numberOfRowsDown) : 0) | ((flag >> numberOfRowsDown) > 0 ? (flag >> numberOfRowsDown) : 0 ));
    rows.push(newRow);
    numberOfRowsDown++;
  }
  return rows;
};

var countSolutions = function(n, rowNumber, attackedSquareRows, flags, check, columnNumber, baseRow){
  
  var row = 0;

  for(var i = 0; i < attackedSquareRows.length; i++){
    row |= attackedSquareRows[i][rowNumber];
  }

  if( row >= check ){
    return 0;
  }

  var solutions = 0;

  if( rowNumber === n - 1 ){
    for(var i = 0; i < flags.length; i++){
      if( !(flags[i] & row) ){
        solutions++;
      }
    }
    return solutions;
  }

  var moreAttackedSquareRows, flag;


  for(var i = 0; i < flags.length; i++){
    flag = flags[i];
    if( !(row & flag) ){
      moreAttackedSquareRows = makeAttackedSquareRows(flag, n, rowNumber, check);
      attackedSquareRows.push(moreAttackedSquareRows);
      solutions += countSolutions(n, rowNumber + 1, attackedSquareRows, flags, check);
      attackedSquareRows.pop();

    }
  }


  return solutions;
};

module.exports.countSolutions = countSolutions;
module.exports.makeFlags = makeFlags;
module.exports.makeAttackedSquareRows = makeAttackedSquareRows;