import _ from "lodash";
import { DefaultMap, openInput, pairwise } from "../utils.js";

interface Replacements {
  [pair: string]: string;
}

interface NewReplacement {
  replacement: string;
  letter: string;
  occurences: number;
}

interface Polymer {
  template: string;
  replacements: Replacements;
}

export function example1(): number {
  return compute(10, "example.txt");
}

export function example2(): number {
  return compute(40, "example.txt");
}

export function part1(): number {
  return compute(10);
}

export function part2(): number {
  return compute(40);
}

function getTemplateAndTransformations(name?: string): Polymer {
  const input = openInput(import.meta.url, name)
    .split("\n")
    .filter((line) => line !== "");
  const [template, ...rest] = input;

  const replacements: Replacements = rest.reduce((insertions, line) => {
    const [pair, replacer] = line.split("->").map((part) => part.trim());

    return {
      ...insertions,
      [pair]: replacer,
    };
  }, {});

  return {
    template,
    replacements,
  };
}

function compute(iterations: number, name?: string): number {
  const { template, replacements } = getTemplateAndTransformations(name);

  const symbolOccurences = new DefaultMap<string, number>(0);
  const pairOccurences = new DefaultMap<string, number>(0);

  template.split("").forEach((letter) => {
    symbolOccurences.set(letter, symbolOccurences.get(letter) + 1);
  });

  for (const part of pairwise(template)) {
    pairOccurences.set(part, pairOccurences.get(part) + 1);
  }

  _.range(0, iterations).forEach(() => {
    const newReplacements: NewReplacement[] = [];

    _.forEach(replacements, (letter, replacement) => {
      if (pairOccurences.has(replacement)) {
        newReplacements.push({
          replacement,
          letter,
          occurences: pairOccurences.get(replacement),
        });
        pairOccurences.delete(replacement);
      }
    });

    for (const newReplacement of newReplacements) {
      const { replacement, letter, occurences } = newReplacement;

      const symbolCount = symbolOccurences.get(letter);
      symbolOccurences.set(letter, symbolCount + occurences);

      const firstPartOfPair = `${replacement[0]}${letter}`;
      const firstPairCount = pairOccurences.get(firstPartOfPair);
      pairOccurences.set(firstPartOfPair, firstPairCount + occurences);

      const secondPartOfPair = `${letter}${replacement[1]}`;
      const secondPairCount = pairOccurences.get(secondPartOfPair);
      pairOccurences.set(secondPartOfPair, secondPairCount + occurences);
    }
  });

  const max = Math.max(...symbolOccurences.values());
  const min = Math.min(...symbolOccurences.values());

  return max - min;
}
