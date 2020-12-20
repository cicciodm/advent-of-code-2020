import path from "path";
import { getLinesFromFile } from "../utilities";
import { convertLinesToInstructions, executeInstructions } from "./instructionUtils";

const instructionLines = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

const instructions = convertLinesToInstructions(instructionLines);

const accumulatorBeforeLoop = executeInstructions(instructions);

console.log("Found accumulator value", accumulatorBeforeLoop);