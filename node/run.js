var countSolutions = require('./newBit.js').countSolutions;
var makeFlags = require('./newBit.js').makeFlags;
var makeAttackedSquareRows = require('./newBit.js').makeAttackedSquareRows;

var n = Number(process.argv[2]);
var rowToStartAt = Number(process.argv[3]);

var xif = 0;
var xelse = 0;
var xcalled = 0;

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
        //if column is available (use attackedSquareRows)
        var flag = flags[j];
        if( !(flag & row) ){
          //push to attackedSquareRows
          //flag, n, currentRowNumber, check
          moreAttackedSquareRows = makeAttackedSquareRows(flag, n, rowNumber, check)
          attackedSquareRows.push(moreAttackedSquareRows);
          if( rowNumber === rowToStartAt ){
            xif++;
            var columnTotal = countSolutions(n, rowToStartAt + 1, attackedSquareRows, flags, check, j, rowToStartAt);
            console.log('columnTotal: ' + columnTotal);
            xcalled++;
            total += columnTotal;
          }else{
            xelse++;
            //magic function rowNumber + 1;
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
  // console.log('xif:' + xif);
  // console.log('xelse:' + xelse);
  // console.log('xcalled:' + xcalled);
  return total;
};

run(n, rowToStartAt);