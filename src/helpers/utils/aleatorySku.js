const aletaroySku = ( paramOne, paramTwo, paramThree ) => {
  let array = [];
  array.push( paramOne, paramTwo, paramThree )
  let text = '';
  let possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 20; i++) {
    text += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
  }
  let word = array.map((value) => value.split("").sort());
  let putTogether = word.map((value) => value.join(""));
  let createWordAleatory = putTogether.join("").concat(text);
  return createWordAleatory;
};

module.exports = { aletaroySku };
