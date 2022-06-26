const order = require("./orderSystem.js").order;

beforeEach(() => {
  jest.spyOn(console, 'log');
});

afterEach(() => {
  console.log.mockClear();
});

test("Returns order", () => {
  order("Breakfast 1,2,3");
  expect(console.log).toHaveBeenCalledWith("Eggs, Toast, Coffee");
});
test("Returns order lowercase", () => {
  order("Breakfast 1,2,3");
  expect(console.log).toHaveBeenCalled();
});

test("Returns order from unordered ids", () => {
  order("breakfast 2,3,1");
  expect(console.log).toHaveBeenCalledWith("Eggs, Toast, Coffee");
});
test("Returns order w/multiple coffee", () => {
  order("Breakfast 1,2,3,3,3");
  expect(console.log).toHaveBeenCalledWith("Eggs, Toast, Coffee(3)");
});
test("Returns side is missing", () => {
  order("Breakfast 1");
  expect(console.log).toHaveBeenCalledWith("Unable to process: Side is missing");
});
test("Returns lunch order", () => {
  order("Lunch 1,2,3");
  expect(console.log).toHaveBeenCalledWith("Sandwich, Chips, Soda");
});
test("Returns lunch order w/water", () => {
  order("Lunch 1,2");
  expect(console.log).toHaveBeenCalledWith("Sandwich, Chips, Water");
});
test("Returns error for multi sandwitch", () => {
  order("Lunch 1,1,2");
  expect(console.log).toHaveBeenCalledWith("Unable to process: Sandwich cannot be ordered more than once");
});
test("Returns order w/more than 1 chips", () => {
  order("Lunch 1,2,2");
  expect(console.log).toHaveBeenCalledWith("Sandwich, Chips(2), Water");
});
test("Returns error when side is missing", () => {
  order("Lunch");
  expect(console.log).toHaveBeenCalledWith("Unable to process: Main is missing, Side is missing");
});
test("Returns order with water added", () => {
  order("Dinner 1,2,3,4");
  expect(console.log).toHaveBeenCalledWith("Steak, Potatoes, Wine, Water, Cake");
});
test("Returns error for no dessert", () => {
  order("Dinner 1,2,3");
  expect(console.log).toHaveBeenCalledWith("Unable to process: Dessert is missing");
});
test("Returns error for invalid meal", () => {
  order("beef");
  expect(console.log).toHaveBeenCalledWith("Unable to process: Meal is missing");
  expect(console.log).toHaveBeenCalledWith("Beef", "is not a vaild meal");
});
test("Returns error for missing order", () => {
  order("");
  expect(console.log).toHaveBeenCalledWith("Unable to process: Order is missing");
});


