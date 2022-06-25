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
    let meal = data[data.length - 1];
    meal = meal[0].toUpperCase() + meal.substring(1);
    console.log(data);
    console.log(meal);

    if (data[0] === '') {
      console.log("Unable to process: Order is missing");
    } else if (meal === "Breakfast" || meal === "Lunch" || meal === "Dinner") {
      console.log("meal accepted");
      if (data[0] === "1") {
        console.log("main is ordered");
        if (data[1] === "2") {
          console.log("side is ordered");
          switch (meal) {
          case "Breakfast":
            receipt.push([menu[meal][data[0]]],menu[meal][data[1]]);
            console.log(receipt);
            breakfast(meal,data);
            break;
          }
        } else {
          console.log("Unable to process: Side is missing");
        }
      } else if (data[0] !== "1" || data[0] !== "2") {
        console.log("Unable to process: Main is missing, Side is missing");
      } else {
        console.log("Unable to process: Main is missing");
      }
    } else {
      console.log("Unable to process: Meal is missing");
    }
  }

  function breakfast(meal, data) {
    let count = 0;
    let item = '';
    for (let i = 2;i < data.length - 1;i++) {
      if (data[i] === '3') {
        count += 1;
        item = menu[meal][data[i]];
      }
    }
    count > 1 ? receipt.push(`${item}(${count})`) : receipt.push(item);
  }
  readline.close();
});

// Breakfast 3,1,2,3



