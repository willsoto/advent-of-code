import _ from "lodash";
import { openInput } from "../utils.js";

interface Signal {
  patterns: string[];
  outputs: string[];
}

// length of segment, number
const segmentMap = new Map<string, number[]>([
  ["6", [0, 6, 9]],
  ["2", [1]],
  ["5", [2, 3, 5]],
  ["4", [4]],
  ["3", [7]],
  ["7", [8]],
]);

const numberToLetters = new Map<number, string>([
  [0, "abcefg"],
  [1, "cf"],
  [2, "acdeg"],
  [3, "acdfg"],
  [4, "bcdf"],
  [5, "abdfg"],
  [6, "abdefg"],
  [7, "acf"],
  [8, "abcdefg"],
  [9, "abcdfg"],
]);

export function part1(): number {
  const signals = getSignals();

  const countUnique = signals.reduce((total, signal) => {
    const uniqueSignalLengths = _(signal.outputs)
      .countBy("length")
      .filter((_number, length) => {
        const matchingNumbers = segmentMap.get(length);

        if (!matchingNumbers) {
          return false;
        }
        return matchingNumbers.length === 1;
      })
      .sum();

    return total + uniqueSignalLengths;
  }, 0);

  return countUnique;
}

export function part2(): number {
  const signals = getSignals();

  let total = 0;
  signals.forEach((signal) => {
    const { patterns, outputs } = signal;

    const patternLengths: Record<number, Set<string>> = patterns.reduce(
      (previous, pattern) => {
        const letters = pattern.split("");

        return {
          ...previous,
          [letters.length]: new Set(letters),
        };
      },
      {},
    );

    let outputValues = "";
    outputs.forEach((o) => {
      const output = new Set(o);
      const intersectionFour = intersection(output, patternLengths[4]);
      const intersectionTwo = intersection(output, patternLengths[2]);

      if (output.size === 2) {
        outputValues = outputValues.concat("1");
      } else if (output.size === 3) {
        outputValues = outputValues.concat("7");
      } else if (output.size === 4) {
        outputValues = outputValues.concat("4");
      } else if (output.size === 7) {
        outputValues = outputValues.concat("8");
      } else if (output.size === 5 && intersectionFour.size === 2) {
        outputValues = outputValues.concat("2");
      } else if (
        output.size === 5 &&
        intersectionFour.size === 3 &&
        intersectionTwo.size === 1
      ) {
        outputValues = outputValues.concat("5");
      } else if (
        output.size === 5 &&
        intersectionFour.size === 3 &&
        intersectionTwo.size === 2
      ) {
        outputValues = outputValues.concat("3");
      } else if (output.size === 6 && intersectionFour.size === 4) {
        outputValues = outputValues.concat("9");
      } else if (
        output.size === 6 &&
        intersectionFour.size === 3 &&
        intersectionTwo.size === 1
      ) {
        outputValues = outputValues.concat("6");
      } else if (
        output.size === 6 &&
        intersectionFour.size === 3 &&
        intersectionTwo.size === 2
      ) {
        outputValues = outputValues.concat("0");
      }
    });

    total += parseInt(outputValues);
  });

  return total;
}

function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter((x) => b.has(x)));
}

function getSignals(): Signal[] {
  return openInput(import.meta.url)
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      return line
        .trim()
        .split("|")
        .map((part) => part.trim());
    })
    .map((signal) => {
      const [patterns, outputs] = signal;

      return {
        patterns: patterns.split(" "),
        outputs: outputs.split(" "),
      };
    });
}
