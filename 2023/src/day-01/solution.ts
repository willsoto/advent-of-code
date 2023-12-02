import { reverse } from "remeda";
import { Input } from "../utils.ts";

const input = new Input(import.meta.url);

function findNumber(characters: string[]): number {
  for (let index = 0; index < characters.length; index++) {
    const element = parseInt(characters[index], 10);

    if (!isNaN(element)) {
      return element;
    }
  }
  throw new Error("No number found");
}

const replacements = new Map([
  ["one", "o1e"],
  ["two", "t2o"],
  ["three", "t3e"],
  ["four", "f4r"],
  ["five", "f5e"],
  ["six", "s6x"],
  ["seven", "s7n"],
  ["eight", "e8t"],
  ["nine", "n9e"],
]);

export function part1() {
  return input
    .lines()
    .map((line) => {
      const characters = line.split("");
      const charactersReversed = reverse(characters);
      const numbers: number[] = [
        findNumber(characters),
        findNumber(charactersReversed),
      ];

      return numbers.join("");
    })
    .map((digits) => parseInt(digits, 10))
    .reduce((prev, current) => prev + current, 0);
}

function replaceWords(line: string): string {
  let subbed = line;
  for (const [key, value] of replacements) {
    subbed = subbed.replace(new RegExp(key, "g"), value);
  }
  return subbed;
}

export function part2() {
  return input
    .lines()
    .map((line) => {
      const replacedLine = replaceWords(line);
      const characters = replacedLine.split("");
      const charactersReversed = reverse(characters);
      const numbers: number[] = [
        findNumber(characters),
        findNumber(charactersReversed),
      ];

      return numbers.join("");
    })
    .map((digits) => parseInt(digits, 10))
    .reduce((prev, current) => prev + current, 0);
}
