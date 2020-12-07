import inputData from "./input.json";

interface Point {
  x: number,
  y: number
};

type Map = string[];

const OPEN_SPACE = ".";
const TREE = "#";

const map = inputData.problem;
const mapWidth = map[0].length;
const mapHeight = map.length;

let treesProduct = 1;

inputData.movements.forEach(movement => {
  const currentTrees = tobogganRide(map, movement);

  treesProduct *= currentTrees;
});

console.log("tested all movements", treesProduct);

function tobogganRide(map: Map, [moveRight, moveDown]: number[]): number {
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

    currentPoint.y += moveDown;
    currentPoint.x = (currentPoint.x + moveRight) % mapWidth;
  }

  console.log("Reached the end for", moveRight, moveDown, "and found", treeCount, "trees");

  return treeCount
}

