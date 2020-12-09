import fs from 'fs';
import path from 'path';

interface PassportPolicy {
  label: string,
  validity: (fieldValue: string) => boolean,
  isOptional: boolean
}

const emptyLineRegex = /\n\s*\n/;
const heightRegex = /([\d]+)(cm|in)/;
const pidRegex = /[\d]{9}/;
const hexColorRegex = /#[a-f0-9]{6}/;
const eyeColorMap = {
  amb: true,
  blu: true,
  brn: true,
  gry: true,
  grn: true,
  hzl: true,
  oth: true
};

const birthYearPolicy: PassportPolicy = {
  label: "byr",
  isOptional: false,
  validity: (fieldValue: string) => {
    const year = parseInt(fieldValue);
    return fieldValue.length === 4 && year >= 1920 && year <= 2002;
  }
};

const issueYearPolicy: PassportPolicy = {
  label: "iyr",
  isOptional: false,
  validity: (fieldValue: string) => {
    const year = parseInt(fieldValue);
    return fieldValue.length === 4 && year >= 2010 && year <= 2020;
  }
};

const expirationYearPolicy: PassportPolicy = {
  label: "eyr",
  isOptional: false,
  validity: (fieldValue: string) => {
    const year = parseInt(fieldValue);
    return fieldValue.length === 4 && year >= 2020 && year <= 2030;
  }
};

const heightPolicy: PassportPolicy = {
  label: "hgt",
  isOptional: false,
  validity: (fieldValue: string) => {
    const matches = fieldValue.match(heightRegex);
    if (!matches || matches.length !== 3) {
      return false;
    }

    const [_full, heightStr, unit] = matches;

    const height = parseInt(heightStr);

    if (unit === "cm") {
      return height >= 150 && height <= 193;
    } else if (unit === "in") {
      return height >= 59 && height <= 76;
    }

    return false;
  }
};

const hairColorPolicy: PassportPolicy = {
  label: "hcl",
  isOptional: false,
  validity: (fieldValue: string) => {
    return hexColorRegex.test(fieldValue);
  }
};

const eyeColorPolicy: PassportPolicy = {
  label: "ecl",
  isOptional: false,
  validity: (fieldValue: string) => {
    return eyeColorMap[fieldValue];
  }
};

const passportIdPolicy: PassportPolicy = {
  label: "pid",
  isOptional: false,
  validity: (fieldValue: string) => {
    return pidRegex.test(fieldValue);
  }
};

const countryIdPolicy: PassportPolicy = {
  label: "cid",
  isOptional: true,
  validity: (fieldValue: string) => {
    return false;
  }
};

const passportPolicies = [
  birthYearPolicy,
  issueYearPolicy,
  expirationYearPolicy,
  heightPolicy,
  hairColorPolicy,
  eyeColorPolicy,
  passportIdPolicy,
  countryIdPolicy
];

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
  return passportPolicies.every(policy => isPolicyValidInPassport(passport, policy));
}

function isPolicyValidInPassport(passport: string, policy: PassportPolicy): boolean {
  if (policy.isOptional) {
    return true;
  }

  const { label, validity } = policy;

  const regex = new RegExp(label + ":(\\S+)\\s");
  const fieldMatches = passport.match(regex);

  if (!fieldMatches || fieldMatches.length < 2) {
    return false;
  }

  return validity(fieldMatches[1]);
}