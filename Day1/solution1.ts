import expenses from "./input.json";

const target = 2020;
const expensesMap: { [key: number]: number } = {};

expenses.forEach(value => {
  const mapVal = expensesMap[value];

  if (mapVal) {
    expensesMap[value] = mapVal + 1;
  } else {
    expensesMap[value] = 1;
  }
});

Object.keys(expensesMap).forEach(currentValueString => {
  const currentValue = parseInt(currentValueString)
  const missing = target - currentValue;

  if (expensesMap[missing]) {
    console.log("Values found:", currentValue, missing);
    console.log("Product is:", currentValue * missing);
  }
});