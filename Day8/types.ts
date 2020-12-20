export type Operation = "acc" | "jmp" | "nop";

export type ProgramResult = "termination" | "loop";

export interface Instruction {
  operation: Operation,
  argument: number
}

// export function isValidOperation(str: string): boolean {
//   return str === "acc"
// }