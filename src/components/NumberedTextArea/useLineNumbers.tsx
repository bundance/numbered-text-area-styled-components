import React, { useCallback } from "react";
import { convertLineNumbersToString, createLineNumbersArray } from "./utils";
import { useScrollSync } from "./useScrollSync";
import { LineNumberDetails } from "./numberedTextArea.types";

export const DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT = 50;
export const DEFAULT_LINE_NUMBER_COLS = 2;

const initialLineNumberState: LineNumberDetails = {
  value: "1",
  height: DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT,
  cols: DEFAULT_LINE_NUMBER_COLS,
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

  // Synchronize the scrolling of both textareas
  useScrollSync(lineNumberTextArea, contentTextArea);

  const setLineNumberTextAreaProps = useCallback(
    (
      contentTextAreaText?: string,
      scrollHeight: number = DEFAULT_LINE_NUMBER_TEXT_AREA_HEIGHT
    ) => {
      const lineNumbers = createLineNumbersArray(contentTextAreaText);
      // Calculate the number of columns needed based on the number of digits of the last line number
      const cols =
        lineNumbers.at(-1)?.toString().length ?? DEFAULT_LINE_NUMBER_COLS;
      const value = convertLineNumbersToString(lineNumbers);

      setLineNumberTextAreaPropsState({
        cols,
        height: scrollHeight,
        value,
      });
    },
    []
  );

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
