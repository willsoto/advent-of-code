import _ from "lodash";
import { openInput } from "../utils.js";

export function example1(): number {
  const caveMap = getCaveMap("example.txt");

  return findPaths(1, caveMap);
}

export function example2(): number {
  const caveMap = getCaveMap("example.txt");

  return findPaths(2, caveMap);
}

export function part1(): number {
  const caveMap = getCaveMap();

  return findPaths(1, caveMap);
}

export function part2(): number {
  const caveMap = getCaveMap();

  return findPaths(2, caveMap);
}

function getCaveMap(name?: string) {
  const map: Record<string, string[]> = {};

  openInput(import.meta.url, name)
    .split("\n")
    .map((line) => line.split("-"))
    .forEach((segment) => {
      const [start, end] = segment;

      if (start in map) {
        map[start].push(end);
      } else {
        map[start] = [end];
      }

      if (end in map) {
        map[end].push(start);
      } else {
        map[end] = [start];
      }
    });

  return map;
}

function findPaths(
  part: 1 | 2,
  caveMap: Record<string, string[]>,
  visited: string[] = [],
  cave = "start",
): number {
  if (cave === "end") {
    return 1;
  } else if (visited.includes(cave)) {
    if (cave === "start") {
      return 0;
    } else if (isLowerCase(cave)) {
      if (part === 1) {
        return 0;
      }
      part = 1;
    }
  }

  const paths: number[] = [];
  for (const neighboringCave of caveMap[cave]) {
    paths.push(findPaths(part, caveMap, [...visited, cave], neighboringCave));
  }

  return _.sum(paths);
}

function isLowerCase(value: string): boolean {
  return value.toLowerCase() === value;
}
