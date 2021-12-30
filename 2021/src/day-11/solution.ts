import _ from "lodash";
import { openInput } from "../utils.js";

const MAX_ENERGY_LEVEL = 9;

/**
 * [x: number, y: number] as a string cause a map's keys fetched based on
 * strict equality
 */
type Coordinates = string;
type Octopi = Map<Coordinates, number>;

export function example1(): number {
  const octopi = getOctopiGrid("example.txt");

  return computePart1(octopi);
}

export function example2(): number {
  const lines = openInput(import.meta.url, "example.txt").split("\n");

  return 0;
}

export function part1(): number {
  const octopi = getOctopiGrid();

  return computePart1(octopi);
}

export function part2(): number {
  const lines = openInput(import.meta.url).split("\n");

  return 0;
}

function parseCoordinates(coordinates: Coordinates): [x: number, y: number] {
  const [x, y] = coordinates.split(",");

  return [parseInt(x, 10), parseInt(y, 10)];
}

function getOctopiGrid(file = "input.txt"): Octopi {
  const octopi = new Map<Coordinates, number>();

  openInput(import.meta.url, file)
    .split("\n")
    .map((line) => line.split(""))
    .map((levels) => levels.map((level) => parseInt(level, 10)))
    .forEach((levels, row) => {
      levels.forEach((level, col) => {
        octopi.set([row, col].toString(), level);
      });
    });

  return octopi;
}

function computePart1(octopi: Octopi): number {
  const steps = _.range(0, 100);
  let totalFlashes = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _step of steps) {
    const flashing = new Set<Coordinates>();
    const flashed = new Set<Coordinates>();

    for (const [coordinates, level] of octopi) {
      const newLevel = level + 1;
      octopi.set(coordinates, newLevel);

      if (newLevel > MAX_ENERGY_LEVEL) {
        flashing.add(coordinates);
      }
    }

    for (const coordinates of flashing) {
      // Remove the octopus from the flashing pile now that it has flashed
      flashing.delete(coordinates);
      // Reset the octopus
      octopi.set(coordinates, 0);
      // Add it to the flashed pile
      flashed.add(coordinates);

      const [row, col] = parseCoordinates(coordinates);
      const adjacentOctopi: string[] = [
        [row, col - 1].toString(), // below
        [row, col + 1].toString(), // above
        [row - 1, col].toString(), // left
        [row + 1, col].toString(), // right
        [row - 1, col - 1].toString(), // lower left
        [row - 1, col + 1].toString(), // upper left
        [row + 1, col - 1].toString(), // lower right
        [row + 1, col + 1].toString(), // upper right
      ];

      for (const adjacent of adjacentOctopi) {
        const level = octopi.get(adjacent);
        const hasFlashed = flashed.has(adjacent);

        // Check that the grid position exists and that the position hasn't already flashed
        if (level !== undefined && !hasFlashed) {
          const newLevel = level + 1;
          octopi.set(adjacent, newLevel);

          if (newLevel > MAX_ENERGY_LEVEL) {
            flashing.add(adjacent);
          }
        }
      }
    }

    totalFlashes = totalFlashes + flashed.size;
  }

  return totalFlashes;
}
