var makeFlags = function(n){
  var flags = [];
  for(var i = 0; i < n; i++){
    flags.push(1 << i);
  }
  return flags;
};


var makeAttackedSquareRows = function(row, n, currentRow, check){
  var rows = [];
  while(rows.length < currentRow){
    rows.push(0);
  }
  var rowDown = 0;
  for(var i = 0; i < n - currentRow; i++){
    newRow = row | ( ((row << rowDown) < check ? (row << rowDown) : 0) | ((row >> rowDown) > 0 ? (row >> rowDown) : 0 ));
    rows.push(newRow);
    rowDown++;
  }
  return rows;
};

var countSolutions = function(n, rowNumber, attackedSquareRows, flags, check, columnNumber){
  
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

  if( rowNumber === 0 ){
    flag = flags[columnNumber];

    moreAttackedSquareRows = makeAttackedSquareRows(flag, n, rowNumber, check);
    attackedSquareRows.push(moreAttackedSquareRows);
    solutions += countSolutions(n, rowNumber + 1, attackedSquareRows, flags, check);
    attackedSquareRows.pop();
  }else{
    for(var i = 0; i < flags.length; i++){
      flag = flags[i];
      if( !(row & flag) ){
        moreAttackedSquareRows = makeAttackedSquareRows(flag, n, rowNumber, check);
        attackedSquareRows.push(moreAttackedSquareRows);
        solutions += countSolutions(n, rowNumber + 1, attackedSquareRows, flags, check);
        attackedSquareRows.pop();

      }
    }
  }

  var moreAttackedSquareRows, flag;

  return solutions;
};

module.exports.countSolutions = countSolutions;
module.exports.makeFlags = makeFlags;