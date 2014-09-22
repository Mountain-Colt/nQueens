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

var getOpenSquares = function(binRow, n){
  var decRow = convertBinToDec(binRow);
  var openPositions = [];
  for(var i = 0; i < n; i++){
    if( !(decRow & 1<<i) ){
      openPositions.push(i);
    }
  }
  return openPositions;
};

var getNextRow = function(binRow, n){
  // debugger;
  var decRow = convertBinToDec(binRow);
  var rightDiagonals = getRightDiagonals(decRow, n);
  var leftDiagonals = getLeftDiagonals(decRow, n);
  var newRow = decRow | rightDiagonals | leftDiagonals;

  return newRow;
};

var getLeftDiagonals = function(decRow, n){
  var leftDiagonals = decRow << 1;
  var leftDiagonalsBin = convertDecToBin(leftDiagonals);
  if( leftDiagonalsBin.length > n){
    leftDiagonalsBin = leftDiagonalsBin.slice(1);
  }
  if( leftDiagonalsBin.length < n ){
    leftDiagonalsBin = padWithZeroes(leftDiagonalsBin, n);
  }
  return convertBinToDec(leftDiagonalsBin);
};

var getRightDiagonals = function(decRow, n){
  var rightDiagonals = decRow >> 1;
  var rightDiagonalsBin = convertDecToBin(rightDiagonals);
  if( rightDiagonalsBin.length > n){
    rightDiagonalsBin = rightDiagonalsBin.slice(1);
  }
  if( rightDiagonalsBin.length < n ){
    rightDiagonalsBin = padWithZeroes(rightDiagonalsBin, n);
  }
  return convertBinToDec(rightDiagonalsBin);
};

var getAvailableBits = function(binRow, n){
  var len = 0;
  var decFlag = 1;
  var availableBits = [];
  while( len < n ){
    var binFlag = convertDecToBin(decFlag);
    if( binFlag.len < n ){
      binFlag = padWithZeroes(binFlag, n);
    }
    if( !(convertBinToDec(binRow) & convertBinToDec(binFlag)) ){
      availableBits.push(len);
    }
    decFlag *= 2;
    len++;
  }
  return availableBits;
};