var countSolutions = function(n, rowNumber, row, queenPosition, flags, solutions, attackedSquareRows){
  var moreAttackedSquareRows, flag;

  rowNumber = rowNumber || 0;
  row = row || 0;
  queenPosition = queenPosition || 1;
  flags = flags || makeFlags(n);
  solutions = solutions || 0;
  attackedSquareRows = attackedSquareRows || [];

  if( row >= (1 << n) ) return;

  
  for(var i = 0; i < n; i++){
    flag = flags[i];
    if( !(row & flag) ){
      moreAttackedSquareRows = makeAttackedSquareRows(flag, n, rowNumber + 1);
      attackedSquareRows.push(moreAttackedSquareRows);
      
    }
  }
};

countSolutions(5);