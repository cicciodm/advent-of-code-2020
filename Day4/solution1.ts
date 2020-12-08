import fs from 'fs';
import path from 'path';
import { stringify } from 'querystring';

const emptyLineRegex = /\n\s*\n/;

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


const fileContent = fs.readFileSync(path.resolve(__dirname, 'inputProblem.txt'), 'utf8');
const allPassports = fileContent.split(emptyLineRegex);

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