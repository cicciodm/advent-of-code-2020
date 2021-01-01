import path from "path";
import { getLinesFromFile } from "../utilities";

const actionRegex = /([A-Z])(\d+)/;

type Action = "N" | "S" | "E" | "W" | "L" | "R" | "F";

type RelativeUnit = number;

// 0,0 is always the ship for the waypoint.
const executionMap: {
  [action: string]:
  (shipState: ShipState, waypointState: WaypointState, value: number) =>
    [ShipState, WaypointState]
} = {
  "N": (shipState: ShipState, waypointState: WaypointState, value: number) => (
    [{ ...shipState }, { ...waypointState, y: waypointState.y + value }] // Waypoint go up
  ),
  "S": (shipState: ShipState, waypointState: WaypointState, value: number) => (
    [{ ...shipState }, { ...waypointState, y: waypointState.y - value }] // Waypoint go down
  ),
  "E": (shipState: ShipState, waypointState: WaypointState, value: number) => (
    [{ ...shipState }, { ...waypointState, x: waypointState.x + value }] // Waypoint go right
  ),
  "W": (shipState: ShipState, waypointState: WaypointState, value: number) => (
    [{ ...shipState }, { ...waypointState, x: waypointState.x - value }] // Waypoint go left
  ),
  "L": (shipState: ShipState, waypointState: WaypointState, value: number) => ([{ ...shipState }, calculateNextOrientation("L", value, waypointState)]),
  "R": (shipState: ShipState, waypointState: WaypointState, value: number) => ([{ ...shipState }, calculateNextOrientation("R", value, waypointState)]),
  "F": (shipState: ShipState, waypointState: WaypointState, value: number) => (
    [
      {
        x: shipState.x + value * waypointState.x,
        y: shipState.y + value * waypointState.y
      },
      { ...waypointState }
    ]),
}

interface ShipState {
  x: number,
  y: number
};

interface WaypointState {
  x: RelativeUnit,
  y: RelativeUnit
}

interface ShipAction {
  action: Action,
  value: number
};

let shipState: ShipState = {
  x: 0,
  y: 0
};

let waypointState: WaypointState = {
  x: 10,
  y: 1
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
  [shipState, waypointState] = executionMap[action.action](shipState, waypointState, action.value);
  console.log("got State", shipState);
});

console.log("Final Shipstate", shipState, "Solution is", Math.abs(shipState.x) + Math.abs(shipState.y));

function calculateNextOrientation(direction: Action, value: number, waypointState: WaypointState): WaypointState {
  if (value === 180) {
    return {
      x: -waypointState.x,
      y: -waypointState.y
    };
  }

  if ((direction === "L" && value === 270) || (direction === "R" && value === 90)) {
    return {
      x: waypointState.y,
      y: -waypointState.x
    };
  }

  if ((direction === "R" && value === 270) || (direction === "L" && value === 90)) {
    return {
      x: -waypointState.y,
      y: waypointState.x
    };
  }

}