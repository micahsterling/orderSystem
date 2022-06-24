const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
let receipt = [];
let menu = {
  Breakfast:{1:"Eggs",2:"Toast",3:"Coffee"},
  Lunch:{1:"Sandwich",2:"Chips",3:"Soda"},
  Dinner:{1:"Steak",2:"Potatos",3:"Wine",4:"Cake"}
};
readline.question(`What's your order? `, input => {
  order(input);
  console.log(receipt.join(", "));
  
  function order(input) {
    let data = input.split(/[, ]+/).sort();
    let meal = menu[data[data.length - 1]];
    for (let i = 0;i < data.length - 1;i++) {
      // receipt += (menu[data[0]][data[i]]) + "," + " ";
      receipt.push(meal[data[i]]);
    }
  }
  readline.close();
// order(input);
// console.log(receipt);

});

// Breakfast 3,1,2



