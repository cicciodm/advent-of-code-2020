import input from "./problemInput.json";
import { findFirstNumberNotASumOfPrevious } from "./solution1";

const results = findFirstNumberNotASumOfPrevious(input);

const target = results.result;

const sums: { [sum: number]: number } = {};
let runningSum = 0;

for (let index = 0; index < input.data.length; index++) {
  runningSum += input.data[index];
  sums[runningSum] = index;
}

console.log("Found sums", sums);

Object.entries(sums).forEach(([sumAtIndexString, index]) => {
  const sumAtIndex = parseInt(sumAtIndexString);

  const possibleOther = sums[sumAtIndex + target];

  console.log("analyzing", sumAtIndex, "so searching for", sumAtIndex + target, "and found", possibleOther);

  if (possibleOther) {
    const subarray = input.data.slice(index + 1, possibleOther + 1);

    console.log("Found subarray with bounds", index + 1, "and", possibleOther, subarray);

    // console.log("now looking at", subarray);
    const max = Math.max(...subarray);
    const min = Math.min(...subarray);

    console.log("Found values", max, min, "solution is", max + min);
  }
});