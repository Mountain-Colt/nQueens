var countSolutions = require('./newBit.js').countSolutions;
var makeFlags = require('./newBit.js').makeFlags;

var n = Number(process.argv[2]);

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


// var total = countSolutions(n, 0, [], flags, check, 0);

console.log('total: ' + total);
