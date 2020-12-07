import inputData from "./input.json";

interface Point {
  x: number,
  y: number
};

const OPEN_SPACE = ".";
const TREE = "#";

const MOVE_RIGHT = 3;
const MOVE_DOWN = 1;

const map = inputData.problem;
const mapWidth = map[0].length;
const mapHeight = map.length;

const currentPoint: Point = {
  x: 0,
  y: 0
};

let treeCount = 0;

while (currentPoint.y < mapHeight) {
  const currentElement = map[currentPoint.y][currentPoint.x];

  if (currentElement === TREE) {
    treeCount++;
  }

  currentPoint.y += MOVE_DOWN;
  currentPoint.x = (currentPoint.x + MOVE_RIGHT) % mapWidth;
}

console.log("Reached the end and found", treeCount, "trees");
