import _ from "lodash";
import { openInput } from "../utils.js";

export function part1(): number {
  const heightmap = getHeightmap();
  const lowestHeights = getLowestHeights(heightmap);

  return _(lowestHeights)
    .map((coordinate) => {
      const height = heightmap.get(coordinate);
      if (height !== undefined) {
        return height + 1;
      }
      return 0;
    })
    .compact()
    .sum();
}

export function part2(): number {
  const heightmap = getHeightmap();
  const lowestHeights = getLowestHeights(heightmap);

  const basins = lowestHeights.map((coordinate) => {
    return basinSearch(heightmap, coordinate);
  });

  const [first, second, third] = basins.sort((a, b) => b - a);

  return first * second * third;
}

/**
 * [x: number, y: number] as a string cause a map's keys fetched based on
 * strict equality
 */
type Coordinates = string;
type Height = number;
type Heightmap = Map<Coordinates, Height>;

function getHeightmap(): Heightmap {
  const input = openInput(import.meta.url)
    .split("\n")
    .filter((line) => line !== "");
  const map: Heightmap = new Map();

  input.forEach((line, lineIndex) => {
    line.split("").forEach((height, heightIndex) => {
      map.set([lineIndex, heightIndex].toString(), parseInt(height, 10));
    });
  });

  return map;
}

function getNeighbors(
  heightmap: Heightmap,
  x: number,
  y: number,
): Coordinates[] {
  const adjacent: Coordinates[] = [
    [x, y - 1].toString(),
    [x, y + 1].toString(),
    [x - 1, y].toString(),
    [x + 1, y].toString(),
  ];

  return adjacent.filter(
    (coordinate) => heightmap.get(coordinate) !== undefined,
  );
}

function isLowestHeight(
  heightmap: Heightmap,
  coordinates: Coordinates,
): boolean {
  return getNeighbors(heightmap, ...parseCoordinates(coordinates)).every(
    (neighbor) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return heightmap.get(coordinates)! < heightmap.get(neighbor)!;
    },
  );
}

function getLowestHeights(heightmap: Heightmap): Coordinates[] {
  const coordinates: Coordinates[] = [];
  heightmap.forEach((height, coordinate) => {
    if (isLowestHeight(heightmap, coordinate)) {
      coordinates.push(coordinate);
    }
  });

  return coordinates;
}

function parseCoordinates(coordinates: Coordinates): [x: number, y: number] {
  const [x, y] = coordinates.split(",");

  return [parseInt(x, 10), parseInt(y, 10)];
}

function basinSearch(heightmap: Heightmap, coordinates: Coordinates): number {
  const height = heightmap.get(coordinates);
  // Just return if we've reached an edge or a node we've visited before
  if (height === 9 || height === undefined) {
    return 0;
  }
  heightmap.delete(coordinates);

  const neighbors = getNeighbors(heightmap, ...parseCoordinates(coordinates));

  const basins = neighbors.map((neighbor) => {
    return basinSearch(heightmap, neighbor);
  });

  return _.sum(basins) + 1;
}
