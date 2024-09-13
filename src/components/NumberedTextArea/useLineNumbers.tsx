import React from "react";
import { createLineNumbers, convertLineNumbersToString } from "./utils";
import { useScrollSync } from "./useScrollSync";
import { LineNumberDetails } from "./numberedTextArea.types";

export const DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT = 50;
export const DEFAULT_LINE_NUMBER_COLS = 1;
export const DEFAULT_MAX_LINE_NUMBERS = 2;

const initialLineNumberState: LineNumberDetails = {
  value: "1",
  height: DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT,
  cols: DEFAULT_LINE_NUMBER_COLS,
  maxChars: DEFAULT_MAX_LINE_NUMBERS,
};

export const useLineNumbers = (
  lineNumberTextArea: React.RefObject<HTMLTextAreaElement>,
  contentTextArea: React.RefObject<HTMLTextAreaElement>,
  initialValue: string,
  rows?: number
) => {
  const [lineNumberTextAreaProps, setLineNumberTextAreaPropsState] =
    React.useState({
      ...initialLineNumberState,
      ...(rows ? { lineNumberHeight: rows } : {}),
    });

  useScrollSync(lineNumberTextArea, contentTextArea);

  const setLineNumberTextAreaProps = (
    text?: string,
    scrollHeight: number = DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT
  ) => {
    const lineNumbers = createLineNumbers(text);
    const cols =
      lineNumbers.at(-1)?.toString().length ?? DEFAULT_LINE_NUMBER_COLS;
    const value = convertLineNumbersToString(lineNumbers);
    const maxChars =
      lineNumbers.at(lineNumbers.length - 1)?.toString().length ??
      DEFAULT_MAX_LINE_NUMBERS;

    setLineNumberTextAreaPropsState({
      cols,
      height: scrollHeight,
      value,
      maxChars,
    });
  };

  React.useEffect(() => {
    if (contentTextArea?.current) {
      setLineNumberTextAreaProps(
        initialValue,
        contentTextArea?.current?.scrollHeight
      );
    }
  }, []);
  return [lineNumberTextAreaProps, setLineNumberTextAreaProps] as const;
};
