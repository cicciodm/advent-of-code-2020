import input from "./problemInput.json";

const data = input.data;

let sortedJoltages = data.sort((a, b) => a - b);
const maxJoltage = sortedJoltages[sortedJoltages.length - 1] + 3;
sortedJoltages = [0, ...sortedJoltages, maxJoltage];

console.log("Here's the available joltages, sorted", sortedJoltages);

const joltagesSet = new Set(sortedJoltages);

const joltagesPossibilities = {};

const joltagesToLast = findPossibilitiesFor(maxJoltage, sortedJoltages);

console.log("Found", joltagesToLast);

function findPossibilitiesFor(
  joltage: number,
  joltageList: number[]
): number {
  if (joltage === 0) {
    return 1;
  }

  if (joltagesPossibilities[joltage]) {
    return joltagesPossibilities[joltage];
  }

  const previousAdapters = joltageList.filter(jolt => joltage - jolt > 0 && joltage - jolt <= 3);
  console.log("Will look for paths to", previousAdapters);
  const previousPossibilities = previousAdapters.map(jolt => findPossibilitiesFor(jolt, joltageList));
  const sumOfPoss = previousPossibilities.reduce((total, poss) => poss + total, 0);

  joltagesPossibilities[joltage] = sumOfPoss;

  return sumOfPoss;
}