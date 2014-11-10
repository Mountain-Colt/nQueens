var countSolutions = require('./mainMain.js').countSolutions;
var makeFlags = require('./mainMain.js').makeFlags;
var makeAttackedSquareRows = require('./mainMain.js').makeAttackedSquareRows;

var n = Number(process.argv[2]);
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
  // console.log('total: ' + total);
  return total;
};

run(n, rowToStartAt);