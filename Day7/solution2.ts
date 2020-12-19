import path from "path";
import { getLinesFromFile } from "../utilities";
import { getBaggageRulesForConfig } from "./bagRulesUtils";
import { BagRules } from "./types";

const baggageRulesConfig = getLinesFromFile(path.resolve(__dirname, 'problemInput.txt'));

const baggageRules = getBaggageRulesForConfig(baggageRulesConfig);

const bagCounts = findBagCounts("shiny gold", baggageRules);

console.log("Found a total of", bagCounts, "bags inside shiny");

function findBagCounts(needle: string, bagRules: BagRules): number {
  const innerBags = bagRules[needle];

  return Object.entries(innerBags).reduce((total, [color, count]) => {
    return total + count + count * findBagCounts(color, bagRules);
  }, 0)
}