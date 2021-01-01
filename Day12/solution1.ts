import path from "path";
import { getLinesFromFile } from "../utilities";

const actionRegex = /([A-Z])(\d+)/;

type Action = "N" | "S" | "E" | "W" | "L" | "R" | "F";

type Orientation = "N" | "S" | "E" | "W";

const orientations: Orientation[] = ["N", "E", "S", "W"];

const executionMap: { [action: string]: (shipState: ShipState, value: number) => ShipState } = {
  "N": (shipState: ShipState, value: number) => ({ ...shipState, coordinates: { ...shipState.coordinates, y: shipState.coordinates.y - value } }),
  "S": (shipState: ShipState, value: number) => ({ ...shipState, coordinates: { ...shipState.coordinates, y: shipState.coordinates.y + value } }),
  "E": (shipState: ShipState, value: number) => ({ ...shipState, coordinates: { ...shipState.coordinates, x: shipState.coordinates.x + value } }),
  "W": (shipState: ShipState, value: number) => ({ ...shipState, coordinates: { ...shipState.coordinates, x: shipState.coordinates.x - value } }),
  "L": (shipState: ShipState, value: number) => ({ ...shipState, orientation: calculateNextOrientation(shipState.orientation, "L", value) }),
  "R": (shipState: ShipState, value: number) => ({ ...shipState, orientation: calculateNextOrientation(shipState.orientation, "R", value) }),
  "F": (shipState: ShipState, value: number) => (executionMap[shipState.orientation](shipState, value)),
}

interface ShipState {
  orientation: Orientation,
  coordinates: {
    x: number,
    y: number
  }
};

interface ShipAction {
  action: Action,
  value: number
};

let shipState: ShipState = {
  orientation: "E",
  coordinates: {
    x: 0,
    y: 0
  }
};

const actionLines = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

const actions: ShipAction[] = actionLines.map(actionLine => {
  const matches = actionLine.match(actionRegex);
  return {
    action: matches[1] as Action,
    value: parseInt(matches[2])
  };
});

actions.forEach(action => {
  console.log("Executing action", action);
  shipState = executionMap[action.action](shipState, action.value);
  console.log("got State", shipState);
});

console.log("Final Shipstate", shipState, "Solution is", Math.abs(shipState.coordinates.x) + Math.abs(shipState.coordinates.y));

function calculateNextOrientation(orientation: Orientation, direction: Action, value: number): Orientation {
  const currentIndex = orientations.indexOf(orientation);
  const rotations = value / 90;
  const nextIndex = (direction === "L" ? currentIndex - rotations : currentIndex + rotations) % 4;
  const properIndex = nextIndex < 0 ? 4 + nextIndex : nextIndex;

  return orientations[properIndex];
}