import path from "path";
import { getInputGroupsFromFile } from "../utilities";

const allAnswerGroups = getInputGroupsFromFile(path.resolve(__dirname, 'problemInput.txt'));
console.log("All answers groups", allAnswerGroups);
const uniquesPerGroup = {};

console.log("beginning iteration");

const totalUniques = allAnswerGroups.reduce((total: number, group: string) => {
  const trimmed = group.replace(/\r?\n|\r/g, "");
  const uniques = new Set(trimmed).size;
  uniquesPerGroup[group] = uniques;
  return total + uniques;
}, 0);

console.log("Found a total of", totalUniques, "responses with the following distro", uniquesPerGroup);