import path from "path";
import { getLinesFromFile } from "../utilities";
import { convertLinesToInstructions, executeInstructions } from "./instructionUtils";
import { Instruction } from "./types";

const instructionLines = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

const instructions = convertLinesToInstructions(instructionLines);

let [programResult, accumulator] = ["loop", 0];
let currentChangedInstructionPointer = instructions.findIndex(isInstructionChangeable);

while (programResult === "loop") {
  const instructionsCopy = [...instructions];
  const newInstruction = changeInstruction(instructions[currentChangedInstructionPointer]);

  instructionsCopy[currentChangedInstructionPointer] = newInstruction;

  [programResult, accumulator] = executeInstructions(instructionsCopy);

  const offsetToNextChange = instructionsCopy.slice(currentChangedInstructionPointer + 1).findIndex(isInstructionChangeable);
  currentChangedInstructionPointer += 1 + offsetToNextChange;
}


console.log("Found accumulator value", [programResult, accumulator]);

function isInstructionChangeable(instruction: Instruction): boolean {
  return instruction.operation === "jmp" || instruction.operation === "nop";
}

function changeInstruction(instruction: Instruction): Instruction {
  return {
    ...instruction,
    operation: instruction.operation === "jmp" ? "nop" : "jmp"
  };
}