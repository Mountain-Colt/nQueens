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
    var columnTotal = countSolutions(n, rowToStartAt, [], flags, check, i);
    total += columnTotal;
    console.log('total for columns ' + i + ' and ' + (n - i) + ': ' + columnTotal * 2);
  }

  if( nIsEven ){
    total *= 2;
  }else{
    var middleColumnTotal = countSolutions(n, rowToStartAt, [], flags, check, halfOfN);
    total = (total * 2) + middleColumnTotal;
    console.log('total for column ' + halfOfN + ': ' + middleColumnTotal);
  }
  return total;
};

//flag, n, currentRowNumber, check
var flag = 4;
var currentRowNumber = 0;
var x = makeAttackedSquareRows(flag, n, currentRowNumber, 1 << n);

console.log(x);
// console.log('total: ' + run(n));


// FOR ROWNUMBER 1; N = 4

// for i < halfOfN
  // calculate makeAttackedSquareRows
  // for i < n
    // run total passing in attackedSquares