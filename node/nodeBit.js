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

var getAvailableBits = function(binRow, n){
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
  var decRow = convertBinToDec(binRow);
  var rightDiagonals = getRightDiagonals(decRow, n);
  var leftDiagonals = getLeftDiagonals(decRow, n);
  var newRow = decRow | rightDiagonals | leftDiagonals;
  var newBinRow = padWithZeroes(convertDecToBin(newRow), n);

  return newBinRow;
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

var addBit = function(decRow, bitNumber){

  return bitNumber === 0 ? decRow | 1: decRow | (1 << bitNumber);
};

var removeBit = function(decRow, bitNumber){

  return decRow - (1 << bitNumber);
};

var countSolutions = function(n, binRow, rowNumber, numberOfSolutions){
  var newRow, availableBits, nextRow;
  //get 0 length of n
  binRow = binRow || padWithZeroes('0', n);

  //rowNumber = rowNumber + 1 || 1;
  rowNumber = rowNumber + 1 || 1;
  numberOfSolutions = numberOfSolutions || 0;

  if(binRow.indexOf('0') === -1){
    return numberOfSolutions;
  }

  //if rowNumber === n
  if( rowNumber === n ){
    debugger;
    //count solutions for openBits.length;
    numberOfSolutions += getAvailableBits(binRow, n).length;
    return numberOfSolutions;    
  }

  //modify row by attacks
  newRow = getNextRow(binRow, n);

  //create array of open bits (all)
  availableBits = getAvailableBits(newRow, n);
  if( availableBits.length === 0 ){
    return numberOfSolutions;
  }

  newRow = convertBinToDec(newRow);

  //for each open bit
  for(var i = 0; i < availableBits.length; i++){
    //add a bit
    nextRow = addBit(newRow, availableBits[i]);
    //recurse
    nextRow = padWithZeroes(convertDecToBin(nextRow), n);
    numberOfSolutions += countSolutions(n, nextRow, rowNumber, numberOfSolutions);
    //remove a bit

  }
  return numberOfSolutions;
};

countSolutions(n);