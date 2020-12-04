import inputData from "./input.json";

const lineRegex = /([0-9]+)-([0-9]+) ([a-z]): (.+)/;

const input = inputData.problem;
let valid = 0;

input.forEach(line => {
  const [full, min, max, char, pwd] = line.match(lineRegex);

  const isValid = validatePassword(min, max, char, pwd);

  valid = valid + (isValid ? 1 : 0);
});

console.log("Found", valid, "valid passwords");

function validatePassword(
  pos1: string,
  pos2: string,
  char: string,
  pwd: string
): boolean {
  const chr1 = pwd.charAt(parseInt(pos1) - 1);
  const chr2 = pwd.charAt(parseInt(pos2) - 1);

  return chr1 === char ? chr2 !== char : chr2 === char;
}

