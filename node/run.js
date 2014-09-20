var countNQueensSolutions = require('./node_columns.js').countNQueensSolutions;

var n = Number(process.argv[2]);

nIsEven = n % 2 === 0;
halfOfN = Math.floor(n / 2);

var total = 0;

for(var i = 0; i < halfOfN; i++){
  var columnTotal = countNQueensSolutions(n, i);
  total += columnTotal;
  console.log('total for column ' + i + ': ' + columnTotal);
}

if( nIsEven ){
  total *= 2;
}else{
  total = (total * 2) + countNQueensSolutions(n, halfOfN);
}

console.log('total: ' + total);
