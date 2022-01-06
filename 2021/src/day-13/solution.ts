import _ from "lodash";
import { openInput } from "../utils.js";

interface Fold {
  axis: "x" | "y";
  line: number;
}

const EXAMPLE_FOLDS: Fold[] = [
  {
    axis: "y",
    line: 7,
  },
  {
    axis: "x",
    line: 5,
  },
];

// fold along x=655
// fold along y=447
// fold along x=327
// fold along y=223
// fold along x=163
// fold along y=111
// fold along x=81
// fold along y=55
// fold along x=40
// fold along y=27
// fold along y=13
// fold along y=6
const INPUT_FOLDS: Fold[] = [
  {
    axis: "x",
    line: 655,
  },
  {
    axis: "y",
    line: 447,
  },
  {
    axis: "x",
    line: 327,
  },
  {
    axis: "y",
    line: 223,
  },
  {
    axis: "x",
    line: 163,
  },
  {
    axis: "y",
    line: 111,
  },
  {
    axis: "x",
    line: 81,
  },
  {
    axis: "y",
    line: 55,
  },
  {
    axis: "x",
    line: 40,
  },
  {
    axis: "y",
    line: 27,
  },
  {
    axis: "y",
    line: 13,
  },
  {
    axis: "y",
    line: 6,
  },
];

export function example1(): number {
  let dots = parseInput("example.txt");
  // Only want the first fold
  const [fold] = EXAMPLE_FOLDS;

  dots = foldPaper(dots, fold);

  return dots.size;
}

export function example2(): string[] {
  let dots = parseInput("example.txt");

  for (const fold of EXAMPLE_FOLDS) {
    dots = foldPaper(dots, fold);
  }

  return printPaper(dots);
}

export function part1(): number {
  let dots = parseInput();
  // Only want the first fold
  const [fold] = INPUT_FOLDS;

  dots = foldPaper(dots, fold);

  return dots.size;
}

export function part2(): string[] {
  let dots = parseInput();

  for (const fold of INPUT_FOLDS) {
    dots = foldPaper(dots, fold);
  }

  return printPaper(dots);
}

function parseInput(name?: string) {
  return openInput(import.meta.url, name)
    .split("\n")
    .reduce((dots, dot) => {
      return dots.add(dot);
    }, new Set<string>());
}

function foldPaper(dots: Set<string>, fold: Fold) {
  const { axis, line } = fold;
  const folded = new Set<string>();

  dots.forEach((rawDot) => {
    const dot = rawDot.split(",").map(Number);
    const [x, y] = dot;

    let xValue = x;
    if (axis === "x") {
      xValue = Math.min(x, 2 * line - x);
    }

    let yValue = y;
    if (axis === "y") {
      yValue = Math.min(y, 2 * line - y);
    }

    folded.add([xValue, yValue].toString());
  });

  return folded;
}

function printPaper(dots: Set<string>, log = false): string[] {
  const points = [...dots].map((dot) => dot.split(",").map(Number));
  const maxX = Math.max(...points.flatMap(([x]) => x));
  const maxY = Math.max(...points.flatMap(([, y]) => y));

  const result: string[] = [];
  for (const y of _.range(0, maxY + 1)) {
    let answer = "";

    for (const x of _.range(0, maxX + 1)) {
      const dot = [x, y].toString();

      if (dots.has(dot)) {
        answer = answer.concat("#");
      } else {
        answer = answer.concat(" ");
      }
    }
    result.push(answer);

    if (log) {
      console.log(answer);
    }
  }

  return result;
}
