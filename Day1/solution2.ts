import expenses from "./input.json";

const TARGET = 2020;
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
  const currentValue = parseInt(currentValueString);
  const missing = TARGET - currentValue;

  const [res1, res2] = findDiff(missing);

  if (res1 && res2) {
    console.log("Values found:", currentValue, res1, res2);
    console.log("Product is", currentValue * res1 * res2);
  }
});


function findDiff(target: number): [number, number] {
  let val1, val2;

  Object.keys(expensesMap).forEach(currentValueString => {
    const currentValue = parseInt(currentValueString)
    const missing = target - currentValue;

    if (expensesMap[missing]) {
      console.log("Values found:", currentValue, missing);
      val1 = currentValue;
      val2 = missing;
    }
  });

  return [val1, val2];
}