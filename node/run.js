var countSolutions = require('./newBit.js').countSolutions;
var makeFlags = require('./newBit.js').makeFlags;
var makeAttackedSquareRows = require('./newBit.js').makeAttackedSquareRows;

var n = Number(process.argv[2]);

var run = function(n){
  nIsEven = n % 2 === 0;
  halfOfN = Math.floor(n / 2);
  var check = (1 << n) - 1;
  var flags = makeFlags(n);
  var total = 0;


  for(var i = 0; i < halfOfN; i++){
    var columnTotal = countSolutions(n, 0, [], flags, check, i);
    total += columnTotal;
    console.log('total for columns ' + i + ' and ' + (n - i) + ': ' + columnTotal * 2);
  }

  if( nIsEven ){
    total *= 2;
  }else{
    var middleColumnTotal = countSolutions(n, 0, [], flags, check, halfOfN);
    total = (total * 2) + middleColumnTotal;
    console.log('total for column ' + halfOfN + ': ' + middleColumnTotal);
  }
  return total;
};



console.log('total: ' + run(n));


// so I can split this up even further by doing a similar division on rowNumbers > 0

// in order to do this I will need to:
  // pass in attackedSquareRows from above
  // return solutions back up to master process