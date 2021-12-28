import { openInput } from "../utils.js";

export function part1(): number {
  const positions = getHorizontalPositions();

  const midpoint = positions[Math.floor(positions.length / 2)];
  let cost = 0;

  positions.forEach((position) => {
    cost += Math.abs(position - midpoint);
  });

  if (positions.length % 2 === 0) {
    let otherCost = 0;
    const midpoint = positions[Math.floor((positions.length - 1) / 2)];

    positions.forEach((position) => {
      otherCost += Math.abs(position - midpoint);
    });

    cost = Math.min(cost, otherCost);
  }

  return cost;
}

export function part2(): number {
  const positions = getHorizontalPositions();

  let minFuel = Infinity;
  for (let i = 0; i < positions.length; i++) {
    const fuel = positions.reduce((accum, position) => {
      const difference = Math.abs(position - i);
      const distance = (difference * (difference + 1)) / 2;

      return accum + distance;
    }, 0);

    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
}

function getHorizontalPositions() {
  return openInput(import.meta.url)
    .split(",")
    .map((line) => parseInt(line))
    .sort((a, b) => a - b);
}
