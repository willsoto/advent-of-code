import _ from "lodash";
import { openInput } from "../utils.js";

function getDepths(): number[] {
  const input = openInput(import.meta.url);

  return input.split("\n").map((line) => parseInt(line.trim()));
}

export function part1(): number {
  const depths = getDepths();

  let previousDepth: number | null = null;
  let totalLarger = 0;

  for (let index = 0; index < depths.length; index++) {
    const depth = depths[index];

    if (previousDepth === null) {
      previousDepth = depth;
      continue;
    }

    if (depth > previousDepth) {
      totalLarger = totalLarger + 1;
    }

    previousDepth = depth;
  }

  return totalLarger;
}

export function part2(): number {
  const depths = getDepths();

  const windowSize = 3;
  let previousDepth: number | null = null;
  let totalLarger = 0;

  for (let index = 0; index < depths.length; index++) {
    const start = index;
    const end = index + windowSize;
    const depth = _(depths).slice(start, end).sum();

    if (previousDepth === null) {
      previousDepth = depth;
      continue;
    }

    if (depth > previousDepth) {
      totalLarger = totalLarger + 1;
    }

    previousDepth = depth;
  }

  return totalLarger;
}
