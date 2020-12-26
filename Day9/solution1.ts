import input from "./problemInput.json";

export function findFirstNumberNotASumOfPrevious(input: { preambleSize: number, data: number[] }): { result: number, index: number } {
  const numberPool = new Set(input.data.slice(0, input.preambleSize));

  let currentIndex = input.preambleSize;

  while (isSumOfTwoNumbersInPool(currentIndex, input.data, numberPool)) {
    const toRemove = input.data[currentIndex - input.preambleSize];
    numberPool.delete(toRemove);
    currentIndex++;
    numberPool.add(input.data[currentIndex]);
  }

  console.log("Found a number which is not the sum of the", input.preambleSize, "previous ones:", input.data[currentIndex], "at index", currentIndex);

  return {
    result: input.data[currentIndex],
    index: currentIndex
  }
}


function isSumOfTwoNumbersInPool(index: number, numberList: number[], numberPool: Set<number>): boolean {
  const needle = numberList[index];
  const numberPoolSize = numberPool.size;

  const numbersToSearch = numberList.slice(index - numberPoolSize, index);

  const results = numbersToSearch.map(nr => {
    return numberPool.has(needle - nr);
  })

  return results.some(response => response);
}

// findFirstNumberNotASumOfPrevious(input);