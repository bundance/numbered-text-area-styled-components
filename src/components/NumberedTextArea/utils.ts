import { LineNumberDetails } from './numberedTextArea.types';

export const createLineNumbers = (text: string = ''): number[] => {
  if (!text) {
    return [1];
  }
  const textRows: string[] = text.split('\n');
  const newLineNumbers: number[] = Array.from(Array(textRows.length).keys());
  // newLineNumbers starts from 0, whereas we want it to start from 1,
  // so shift the line lineNumbers forward 1
  newLineNumbers.shift();
  newLineNumbers.length > 0
    ? newLineNumbers.push((newLineNumbers?.at(-1) ?? 0) + 1)
    : newLineNumbers.push(1);

  return newLineNumbers;
}

export const convertLineNumbersToString = (lineNumbers: number[]): string => 
  lineNumbers
    .reduce((acc, lineNumberValue) => `${acc}\n${lineNumberValue}`, '')
    .trim();
