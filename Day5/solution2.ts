import inputData from "./input.json";

const regex = /([F|B]{7})([L|R]{3})/;
const ROW_MAX = 127;
const COL_MAX = 7;

const input = inputData.problem;
let maxId = 0;
let minId = 99999999;

const seatsMap = {};

input.forEach(description => {
  const [_full, rowDescription, columnDescription] = description.match(regex);

  const row = binaryPartition(rowDescription, true);
  const column = binaryPartition(columnDescription, false);

  const seatId = row * 8 + column;

  maxId = seatId > maxId ? seatId : maxId;
  minId = seatId < minId ? seatId : minId;
  seatsMap[seatId] = true;
});

for (let index = minId + 1; index < maxId; index++) {
  if (!seatsMap[index]) {
    console.log("Seat is", index);
  }
}

function binaryPartition(description: string, isRow: boolean): number {
  let lower = isRow ? "F" : "L";
  let upper = isRow ? "B" : "R";
  let max = isRow ? ROW_MAX : COL_MAX;

  let currentMin = 0;
  let currentMax = max;

  [...description].forEach(direction => {
    const difference = Math.ceil((currentMax - currentMin) / 2);
    // console.log("The difference will be", difference);

    switch (direction) {
      case lower:
        currentMax = currentMax - difference;
        break;
      case upper:
        currentMin = currentMin + difference;
        break;

      default:
        break;
    }
    // console.log("New bounds", currentMin, currentMax);
  });

  // console.log("returning", currentMin);
  return currentMin;
}