import _ from "lodash";
import { openInput } from "../utils.js";
import { VentLine } from "./models.js";

export function part1(): number {
  const ventLines = parseVentLines();
  const ventTopology: number[][] = [];

  for (let index = 0; index < ventLines.length; index++) {
    const ventLine = ventLines[index];

    if (ventLine.isDiagonal) {
      continue;
    }

    ventTopology.push(...ventLine.topology());
  }

  return getIntersectionCounts(ventTopology);
}

export function part2(): number {
  const ventLines = parseVentLines();
  const ventTopology: number[][] = [];

  for (let index = 0; index < ventLines.length; index++) {
    const ventLine = ventLines[index];

    ventTopology.push(...ventLine.topology());
  }

  return getIntersectionCounts(ventTopology);
}

function parseVentLines(): VentLine[] {
  const ventLines = openInput(import.meta.url)
    .split("\n")
    .map((line) => {
      return line.split("->").map((part) => part.trim());
    })
    .map((line) => line.map((part) => part.split(",")))
    .filter((line) => {
      return line.length === 2;
    })
    .map((line) => new VentLine(line));

  return ventLines;
}

function getIntersectionCounts(ventTopology: number[][]) {
  return _(ventTopology)
    .countBy()
    .values()
    .sumBy((count) => {
      if (count > 1) {
        return 1;
      }
      return 0;
    });
}
