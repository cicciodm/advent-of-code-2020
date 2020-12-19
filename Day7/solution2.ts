import path from "path";
import { getInputGroupsFromFile } from "../utilities";

const allAnswerGroups = getInputGroupsFromFile(path.resolve(__dirname, 'problemInput.txt'));

const totalConsensus = allAnswerGroups.reduce((total: number, group: string) => {
  const peopleAnswers = group.split(/\r?\n|\r/g);
  const peopleCount = peopleAnswers.length;

  let consensusPerGroup = 0;
  const answerCounts = {};
  peopleAnswers.forEach(answerSet => {
    [...answerSet].forEach(answer => {
      answerCounts[answer] = answerCounts[answer] ? answerCounts[answer] + 1 : 1;

      if (answerCounts[answer] === peopleCount) {
        consensusPerGroup++;
      }
    });
  });
  // console.log("returning", consensusPerGroup, "for", answerCounts);
  return consensusPerGroup + total;
}, 0);

console.log("Found a total of", totalConsensus, "consensus responses");