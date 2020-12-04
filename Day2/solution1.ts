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
  min: string,
  max: string,
  char: string,
  pwd: string
): boolean {
  const count = [...pwd].filter(letter => letter === char).length

  return count >= parseInt(min) && count <= parseInt(max);
}

