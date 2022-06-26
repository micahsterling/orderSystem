const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let menu = {
  Breakfast:{1:"Eggs",2:"Toast",3:"Coffee"},
  Lunch:{1:"Sandwich",2:"Chips",3:"Soda"},
  Dinner:{1:"Steak",2:"Potatoes",3:"Wine",4:"Cake"}
};
readline.question(`What's your order? `, input => {
  order(input);
  readline.close();
});

function order(input) {
  let receipt = [];
  let data = input.split(/[, ]+/).sort();
  let meal = data[data.length - 1];
  if (data[0] === '' ) {
    data.shift();
  }
  if (data.length >= 1 && data[0] !== '') {
    meal = meal[0].toUpperCase() + meal.substring(1);
  }
  
  if (data[0] === '' || data.length === 0) {
    console.log("Unable to process: Order is missing");
  } else if (meal === "Breakfast" || meal === "Lunch" || meal === "Dinner") {
    if (data[0] === "1") {
      if (data[1] === "2") {
        switch (meal) {
        case "Breakfast":
          receipt.push([menu[meal][data[0]]],menu[meal][data[1]]);
          breakfast(meal,data,receipt);
          break;
        case "Lunch":
          receipt.push([menu[meal][data[0]]]);
          lunch(meal,data,receipt);
          break;
        case "Dinner":
          dinner(meal,data,receipt);
          break;
        }
      } else if (data[1] === "1") {
        console.log(`Unable to process: ${menu[meal][data[1]]} cannot be ordered more than once`);
      } else {
        console.log("Unable to process: Side is missing");
      }
    } else if (data[0] !== "1" || data[0] !== "2") {
      console.log("Unable to process: Main is missing, Side is missing");
    } else {
      console.error("Unable to process: Main is missing");
    }
  } else {
    console.log("Unable to process: Meal is missing");
    console.log(meal,"is not a vaild meal");
  }
  if (receipt.length > 0) {
    console.log(receipt.join(", ")); 
  }
}
module.exports.order = order;

function breakfast(meal,data,receipt) {
  let count = 0;
  let item = '';
  for (let i = 2;i < data.length - 1;i++) {
    if (data[i] === '3') {
      count += 1;
      item = menu[meal][data[i]];
    } 

  }
  item === '' ? item = "water" : '';
  count > 1 ? receipt.push(`${item}(${count})`) : receipt.push(item);
}
module.exports.breakfast = breakfast;

function lunch(meal,data,receipt) {
  let count = 0;
  let item = '';
  let drink = '';
  for (let i = 1;i < data.length - 1;i++) {
    if (data[i] === '2') {
      count += 1;
      item = menu[meal][data[i]];
    } else if (data[i] === '3') {
      drink = menu[meal][data[i]];
    }
  }
  count > 1 ? receipt.push(`${item}(${count})`) : receipt.push(item);
  drink === "" ?  receipt.push("Water") : receipt.push(drink);
}

function dinner(meal,data,receipt) {
  if (data[3] === "4") {
    for (let i = 0;i < data.length - 1;i++) {
      if (data[i] === "3") {
        receipt.push([menu[meal][data[i]]]);
        receipt.push('Water');
      } else {
        receipt.push([menu[meal][data[i]]]);
      }
    }
  } else {
    console.log("Unable to process: Dessert is missing");
  }
}


// Breakfast 3,1,2,3



