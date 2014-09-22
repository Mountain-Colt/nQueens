var n = process.argv[2];

var padWithZeroes = function(bin, n){
  while( bin.length < n ){
    bin = '0' + bin;
  }
  return bin;
};

var convertBinToDec = function(bin){
  return parseInt(bin, 2);
};

var convertDecToBin = function(dec){
  return dec.toString(2);
};

var getOpenSquares = function(row, n){
  var decRow = convertBinToDec(row);
  var openPositions = [];
  for(var i = 0; i < n; i++){
    if( !(decRow & 1<<i) ){
      openPositions.push(i);
    }
  }
  return openPositions;
};

var getNextRow = function(row, n){
  var decRow = convertBinToDec(row);
  var rightDiagonals = getRightDiagonals(decRow, n);
  var leftDiagonals = getLeftDiagonals(decRow, n);

  return newRow;
};

var getLeftDiagonals = function(decRow, n){
  var leftDiagonals = decRow << 1;
  var leftDiagonalsBin = convertDecToBin(leftDiagonals);
  if( leftDiagonalsBin.length > n){
    leftDiagonalsBin = leftDiagonalsBin.slice(1);
  }
  return convertBinToDec(leftDiagonalsBin);
};

var getRightDiagonals = function(decRow, n){
  var rightDiagonals = decRow >> 2;
  var rightDiagonalsBin = convertDecToBin(rightDiagonals);
  if( rightDiagonalsBin.length > n){
    rightDiagonalsBin = rightDiagonalsBin.slice(1);
  }
  return convertBinToDec(rightDiagonalsBin);
}
//set new flag for each row where empty and within N

var length = 0;
var flag = 1;
while( length < n ){
  var bin = flag.toString(2);
  if( bin.length < n ){
    bin = padWithZeroes(bin, n);
  }
  console.log(bin);

  flag *= 2;
  length++;
} 
