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

const minTimeStamp = Math.min(...departureTimes);
let timestamp = 100000000000000;

while (!isTimestampValid(timestamp)) {
  timestamp += minTimeStamp; // Increment by min, as the first mod has to be 0
}

console.log("Found initial timestamp", timestamp, "after ms", Date.now() - startTime);

function isTimestampValid(timestampToCheck: number): boolean {
  const results = departureTimes.map(time => {
    const offset = (Math.ceil(timestampToCheck / time) * time) - timestampToCheck;
    // console.log("Checking departure time", time, "the offset from", timestampToCheck, "is", offset, "and this is the map", timeToOffsetMap);
    return timeToOffsetMap[time] === offset;
  });

  return results.every(res => res);
}