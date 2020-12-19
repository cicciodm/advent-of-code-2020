import fs from "fs";

const emptyLineRegex = /\r\n\r\n/;
const newLineRegex = /\r\n/;

export function getInputGroupsFromFile(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return fileContent.split(emptyLineRegex);
}

export function getLinesFromFile(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return fileContent.split(newLineRegex);
}