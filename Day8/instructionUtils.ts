import { Instruction, Operation, ProgramResult } from "./types";

const instructionRegex = /([a-z]+) (.*)/

export function convertLinesToInstructions(lines: string[]): Instruction[] {
  return lines.map(convertToInstruction);
}

export function convertToInstruction(line: string): Instruction {
  const matches = line.match(instructionRegex);

  return {
    operation: matches[1] as Operation,
    argument: parseInt(matches[2])
  }
}

export function executeInstructions(instructions: Instruction[]): [ProgramResult, number] {
  let accumulator = 0;
  let instructionPointer = 0;
  const executedLines = new Set();

  while (!executedLines.has(instructionPointer) && instructionPointer !== instructions.length) {
    executedLines.add(instructionPointer);

    const currentInstruction = instructions[instructionPointer];

    switch (currentInstruction.operation) {
      case "acc": {
        accumulator += currentInstruction.argument;
        instructionPointer++;
        break;
      }
      case "jmp": {
        instructionPointer += currentInstruction.argument;
        break;
      }
      case "nop": {
        instructionPointer++
      }
    }
  }

  const programResult = executedLines.has(instructionPointer) ? "loop" : "termination";

  return [programResult, accumulator];
}