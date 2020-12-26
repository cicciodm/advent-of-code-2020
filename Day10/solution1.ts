import input from "./problemInput.json";

const data = input.data;

let sortedJoltages = data.sort((a, b) => a - b);
sortedJoltages = [0, ...sortedJoltages, sortedJoltages[sortedJoltages.length - 1] + 3];

console.log("Here's the available joltages, sorted", sortedJoltages);

const differences = {};

sortedJoltages.forEach((joltage, index) => {
  if (index > 0) {
    const diff = joltage - sortedJoltages[index - 1];
    differences[diff] = differences[diff] ? differences[diff] + 1 : 1;
  }
});

console.log("Found differences distro", differences, "solution is", differences[1] * differences[3]);
