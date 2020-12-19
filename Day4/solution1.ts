import path from 'path';
import { getInputGroupsFromFile } from '../utilities';

const requiredFieldsRegexes = [
  /byr:/,
  /iyr:/,
  /eyr:/,
  /hgt:/,
  /hcl:/,
  /ecl:/,
  /pid:/,
  ///cid:/
]

const allPassports = getInputGroupsFromFile(path.resolve(__dirname, 'inputProblem.txt'));

let validPassports = 0;

allPassports.forEach(passport => {
  console.log("\nTesting passport\n", passport);

  if (isPassportValid(passport)) {
    console.log("Passport was valid\n");
    validPassports++;
  }
});

console.log("Found a total of", validPassports, "valid passports");

function isPassportValid(passport: string): boolean {
  return requiredFieldsRegexes.every(field => field.test(passport));
}