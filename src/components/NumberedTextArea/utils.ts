export const createLineNumbersArray = (text: string = ""): number[] => {
  if (!text) {
    return [1];
  }
  const lineNumbers: string[] = text.split("\n");
  const newLineNumbers = Array.from(
    { length: lineNumbers.length },
    (_, i) => i + 1
  );
  return newLineNumbers;
};

export const convertLineNumbersToString = (lineNumbers: number[]): string =>
  lineNumbers
    .reduce((acc, lineNumberValue) => `${acc}\n${lineNumberValue}`, "")
    .trim();
