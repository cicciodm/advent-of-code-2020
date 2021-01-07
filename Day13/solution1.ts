import path from "path";
import { getLinesFromFile } from "../utilities";

const lines = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

const departTimestamp = parseInt(lines[0]);

const departureTimes = lines[1].split(",").filter(time => time !== "x").map(val => parseInt(val));

const minutesAtDepartures = departureTimes.map(depTime => Math.ceil(departTimestamp / depTime) * depTime);

const earlierTime = Math.min(...minutesAtDepartures);

const diff = earlierTime - departTimestamp;

const busId = departureTimes[minutesAtDepartures.findIndex(time => time === earlierTime)];

console.log("Found that bus", busId, "departing at", earlierTime, "will mean I have to wait", diff, "minutes. Result", busId * diff);