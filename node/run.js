var countSolutions = require('./newBit.js').countSolutions;
var makeFlags = require('./newBit.js').makeFlags;
var makeAttackedSquareRows = require('./newBit.js').makeAttackedSquareRows;

var n = Number(process.argv[2]);

var run = function(n, rowToStartAt){
  rowToStartAt = rowToStartAt || 0;
  nIsEven = n % 2 === 0;
  halfOfN = Math.floor(n / 2);
  var check = (1 << n) - 1;
  var flags = makeFlags(n);
  var total = 0;


  for(var i = 0; i < halfOfN; i++){
    //flag, n, currentRowNumber, check
    var attackedSquareRows = [];
    attackedSquareRows.push(makeAttackedSquareRows(flags[i], n, 0, check));
    for(var j = 0; j < n; j++){
      // n, rowNumber, attackedSquareRows, flags, check, columnNumber, baseRow
      var columnTotal = countSolutions(n, 1, attackedSquareRows, flags, check, j, 1);
      total += columnTotal;
    }
  }

  if( nIsEven ){
    total *= 2;
  }else{
    var attackedSquareRows = [];
    attackedSquareRows.push(makeAttackedSquareRows(flags[halfOfN], n, 0, check));
    var middleColumnTotal = 0;
    for(var i = 0; i < n; i++){
      // n, rowNumber, attackedSquareRows, flags, check, columnNumber, baseRow
      middleColumnTotal += countSolutions(n, 1, attackedSquareRows, flags, check, i, 1);
    }

    total = (total * 2) + middleColumnTotal;
  }
  console.log('total: ' + total);
  return total;
};