import path from "path";
import { getLinesFromFile } from "../utilities";
import { getBaggageRulesForConfig } from "./bagRulesUtils";
import { BagRules } from "./types";

const baggageRulesConfig = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

const baggageRules = getBaggageRulesForConfig(baggageRulesConfig);

const validBags = findValidBags("shiny gold", baggageRules);

console.log("Found a total of", validBags.length, "valid enclosures for shiny");

function findValidBags(needle: string, bagRules: BagRules): string[] {
  const colorsToCheck = Object.entries(bagRules).filter(([_enclosing, rules]) => {
    return rules ? !!rules[needle] : false;
  }).map(([enclosing, _rules]) => enclosing);

  console.log("For", needle, "found", colorsToCheck);

  const levelsForEnclosing = colorsToCheck.map(color => findValidBags(color, bagRules)).flat();

  const uniques = new Set<string>([...colorsToCheck, ...levelsForEnclosing]);

  return [...uniques.keys()];
}