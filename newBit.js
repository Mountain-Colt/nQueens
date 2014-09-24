var n = process.argv[2];

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

var countSolutions = function(n, rowNumber, attackedSquareRows, flags, check){
  // debugger;

  rowNumber = rowNumber || 0;
  
  var row = 0;
  attackedSquareRows = attackedSquareRows || [];

  for(var i = 0; i < attackedSquareRows.length; i++){
    row |= attackedSquareRows[i][rowNumber];
  }

  check = check || ((1 << n) - 1);

  if( row >= check ){
    return 0;
  }

  var solutions = 0;
  flags = flags || makeFlags(n);

  if( rowNumber === n - 1 ){
    for(var i = 0; i < flags.length; i++){
      if( !(flags[i] & row) ){
        solutions++;
      }
    }
    return solutions;
  }

  var moreAttackedSquareRows, flag;



  
  // debugger;
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

console.log(countSolutions(n));