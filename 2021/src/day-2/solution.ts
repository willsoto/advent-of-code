import { openInput } from "../utils.js";

type Direction = "forward" | "down" | "up";

interface Line {
  direction: Direction;
  distance: number;
}

export function part1(): number {
  const lines = parseInput();

  let horizontalPosition = 0;
  let depth = 0;

  lines.forEach((line) => {
    const { direction, distance } = line;

    if (direction === "forward") {
      horizontalPosition = horizontalPosition + distance;
    } else if (direction === "down") {
      depth = depth + distance;
    } else if (direction === "up") {
      depth = depth - distance;
    }
  });

  const total = horizontalPosition * depth;

  return total;
}

export function part2(): number {
  const lines = parseInput();

  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  lines.forEach((line) => {
    const { direction, distance } = line;

    if (direction === "forward") {
      horizontalPosition = horizontalPosition + distance;
      depth = depth + aim * distance;
    } else if (direction === "down") {
      aim = aim + distance;
    } else if (direction === "up") {
      aim = aim - distance;
    }
  });

  const total = horizontalPosition * depth;

  return total;
}

function parseInput() {
  return openInput(import.meta.url)
    .split("\n")
    .map(parseLine);
}

function parseLine(line: string): Line {
  const [direction, distance] = line.trim().split(" ");

  return {
    direction: direction as Direction,
    distance: parseInt(distance),
  };
}
