import { time } from "console";
import path from "path";
import { getLinesFromFile } from "../utilities";

const lines = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

const timeToOffsetMap = {};

const startTime = Date.now();

const departureTimes = lines[1].split(",").filter(time => time !== "x").map(val => parseInt(val));

lines[1].split(",").forEach((val, index) => {
  const asInt = parseInt(val);
  if (asInt) {
    timeToOffsetMap[asInt] = index;
  }
});

const firstTime = departureTimes[0];
const secondTime = departureTimes[1];

let timeStamp = firstTime;

while ((timeStamp + timeToOffsetMap[secondTime]) % secondTime !== 0) {
  timeStamp += firstTime;
}

console.log("found", timeStamp, "as timestamp that fits", firstTime, secondTime);

let constant = firstTime * secondTime;

for (let index = 2; index < departureTimes.length; index++) {
  const currentTime = departureTimes[index];

  while ((timeStamp + timeToOffsetMap[currentTime]) % currentTime !== 0) {
    timeStamp += constant;
  }

  console.log("Sanity check");
  const mods = departureTimes.map(t => t - (timeStamp % t));
  console.log(mods);

  // console.log("found that", timeStamp + timeToOffsetMap[currentTime], "mod", currentTime, "is", (timeStamp + timeToOffsetMap[currentTime]) % currentTime);
  constant = constant * currentTime;
  // console.log("now const is", constant);
}

console.log(timeToOffsetMap);

console.log("Found a final time of", timeStamp);