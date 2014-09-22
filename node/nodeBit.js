var n = process.argv[2];

var padWithZeroes = function(bin, n){
  while( bin.length < n ){
    bin = '0' + bin;
  }
  return bin;
};

var getOpenSquares = function(row, n){
  var dec = parseInt(row, 2);
  var openPositions = [];
  for(var i = 0; i < n; i++){
    if( !(dec & 1<<i) ){
      openPositions.push(i);
    }
  }

  return openPositions;
};
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
