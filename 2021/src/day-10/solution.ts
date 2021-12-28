import assert from "assert";
import _ from "lodash";
import { openInput } from "../utils.js";

const syntaxErrorScores: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const completionScores: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const closingTokens = new Map<string, string>([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
]);
const openingTokens = new Map<string, string>([
  [")", "("],
  ["]", "["],
  ["}", "{"],
  [">", "<"],
]);

export function example1(): number {
  const lines = openInput(import.meta.url, "example.txt")
    .split("\n")
    .map((line) => line.split(""));

  return computePart1(lines);
}

export function example2(): number {
  const lines = openInput(import.meta.url, "example.txt")
    .split("\n")
    .map((line) => line.split(""));

  return computePart2(lines);
}

export function part1(): number {
  const lines = openInput(import.meta.url)
    .split("\n")
    .map((line) => line.split(""));

  return computePart1(lines);
}

export function part2(): number {
  const lines = openInput(import.meta.url)
    .split("\n")
    .map((line) => line.split(""));

  return computePart2(lines);
}

function computePart1(lines: string[][]): number {
  const scores: number[] = [];
  for (const line of lines) {
    // Contains opening tokens only
    const stack: string[] = [];

    for (const token of line) {
      if (closingTokens.has(token)) {
        stack.push(token);
      } else if (stack.pop() !== openingTokens.get(token)) {
        // Stop at the first sign of corruption
        scores.push(syntaxErrorScores[token]);
        break;
      }
    }
  }

  return _.sum(scores);
}

function computePart2(lines: string[][]): number {
  const scores: number[] = [];

  for (const line of lines) {
    // Contains opening tokens only
    const stack: string[] = [];
    let score = 0;
    let corrupted = false;

    for (const token of line) {
      if (closingTokens.has(token)) {
        stack.push(token);
      } else if (stack.pop() !== openingTokens.get(token)) {
        corrupted = true;
        break;
      }
    }

    if (corrupted) {
      continue;
    }

    while (stack.length > 0) {
      const token = stack.pop();
      assert(token);

      const closingToken = closingTokens.get(token);
      assert(closingToken);

      const tokenScore = completionScores[closingToken];

      score = score * 5 + tokenScore;
    }

    scores.push(score);
  }
  const sorted = scores.sort((a, b) => b - a);

  return sorted[Math.floor(sorted.length / 2)];
}
