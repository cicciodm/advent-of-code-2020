import path from "path";
import { getLinesFromFile } from "../utilities";

const FLOOR = ".";
const EMPTY = "L";
const FULL = "#";

interface Direction {
  x: number,
  y: number
}

const directions: Direction[] = [
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
]

const seatingLines = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

console.log("Initial seating\n" + seatingLines.join("\n"));

const finalSeatingArrangements = executeSeating(seatingLines);

const occupiedSeats = countOccupiedSeats(finalSeatingArrangements);

console.log("Final seatings\n" + finalSeatingArrangements.join("\n"));

console.log("At the end of seating, found", occupiedSeats, "occupied seats");

function executeSeating(seating: string[]): string[] {
  let previousSeating = seating;
  let nextSeating = executeStep(previousSeating);

  while (!areSeatingsEqual(nextSeating, previousSeating)) {
    previousSeating = nextSeating;
    nextSeating = executeStep(previousSeating);
  }

  return nextSeating;
}

function executeStep(seating: string[]): string[] {
  const newSeating = [];

  for (let y = 0; y < seating.length; y++) {
    const seatLine = seating[y];
    const newSeatLine = [];
    for (let x = 0; x < seatLine.length; x++) {
      const seat = seatLine[x];
      const newSeat = nextSeat(seat, x, y, seating);
      newSeatLine.push(newSeat);
    }
    newSeating.push(newSeatLine.join(""));
  }

  return newSeating;
}

function nextSeat(seat: string, x: number, y: number, seating: string[]): string {
  switch (seat) {
    case FLOOR:
      return FLOOR;
    case EMPTY: {
      const adjacentSeats: string = getVisibleSeats(x, y, seating);
      return [...adjacentSeats].every(seat => (seat === EMPTY || seat === FLOOR)) ? FULL : EMPTY;
    }
    case FULL: {
      const adjacentSeats: string = getVisibleSeats(x, y, seating);
      return [...adjacentSeats].filter(seat => seat === FULL).length >= 5 ? EMPTY : FULL;
    }
  }
}

function getVisibleSeats(x: number, y: number, seating: string[]): string {
  const stringRes = directions.map(direction => {
    let xx = x, yy = y, visibleSeat;

    do {
      xx = xx + direction.x;
      yy = yy + direction.y;
      visibleSeat = seating[yy]?.[xx];
    } while (visibleSeat && visibleSeat === FLOOR);

    return visibleSeat || "";
  });
  return stringRes.join("");
}

function areSeatingsEqual(seating1: string[], seating2: string[]): boolean {
  return seating1.map((seating, index) => seating === seating2[index]).every(lol => lol);
}

function countOccupiedSeats(seatingLines: string[]): number {
  return seatingLines.reduce((total, seatingLine) => [...seatingLine].filter(seat => seat === FULL).length + total, 0);
}