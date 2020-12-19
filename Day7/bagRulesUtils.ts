import { BagRules, ContainRules } from "./types";

const enclosingBagRegex = /([a-zA-Z ]+) bags contain/;
const innerBagsRegex = /(?:(\d+) ([a-zA-Z ]+) bags?)+/g;

export function getBaggageRulesForConfig(rulesConfig: string[]): BagRules {
  let bagRules: BagRules = null;

  rulesConfig.forEach(config => {
    const containRule: ContainRules = {};

    let innerBagsMatch;
    while (innerBagsMatch = innerBagsRegex.exec(config)) {
      bagRules = bagRules || {};

      const color = innerBagsMatch[2];
      const count = parseInt(innerBagsMatch[1]);
      containRule[color] = count;
    }

    const enclosingMatches = config.match(enclosingBagRegex);
    const enclosingColor = enclosingMatches[1];

    bagRules[enclosingColor] = containRule;
  });

  // console.log(bagRules);

  return bagRules;
}