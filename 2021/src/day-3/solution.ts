import _ from "lodash";
import assert from "node:assert";
import { openInput } from "../utils.js";

enum DiagnosticType {
  Oxygen,
  C02,
}

type Diagnostics = string[];

export function part1(): number {
  const diagnostics = parseDiagnosticsFromInput();
  const counts = getDiagnosticCounts(diagnostics);

  let gammaRateBinary = "";
  let epsilonRateBinary = "";

  _.forEach(counts, (count) => {
    gammaRateBinary = gammaRateBinary.concat(count.maximum.value);
    epsilonRateBinary = epsilonRateBinary.concat(count.minimum.value);
  });

  const gammaRate = parseInt(gammaRateBinary, 2);
  const epsilonRate = parseInt(epsilonRateBinary, 2);

  const powerConsumption = gammaRate * epsilonRate;

  return powerConsumption;
}

export function part2(): number {
  const range = _.range(0, 12);

  let oxygenGeneratorRatings = parseDiagnosticsFromInput();
  for (let index = 0; index < range.length; index++) {
    if (oxygenGeneratorRatings.length === 1) {
      break;
    }

    oxygenGeneratorRatings = filterDiagnostics(
      oxygenGeneratorRatings,
      index,
      DiagnosticType.Oxygen,
    );
  }

  let c02ScrubberRatings = parseDiagnosticsFromInput();
  for (let index = 0; index < range.length; index++) {
    if (c02ScrubberRatings.length === 1) {
      break;
    }

    c02ScrubberRatings = filterDiagnostics(
      c02ScrubberRatings,
      index,
      DiagnosticType.C02,
    );
  }

  const [oxygenGeneratorRating] = oxygenGeneratorRatings;
  const [c02ScrubberRating] = c02ScrubberRatings;

  const lifeSupportRating =
    parseInt(oxygenGeneratorRating, 2) * parseInt(c02ScrubberRating, 2);

  return lifeSupportRating;
}

function parseDiagnosticsFromInput(): Diagnostics {
  return openInput(import.meta.url)
    .split("\n")
    .map((line) => line.trim());
}

function filterDiagnostics(
  diagnostics: Diagnostics,
  index: number,
  type: DiagnosticType,
) {
  const counts = getDiagnosticCounts(diagnostics);
  const { minimum, maximum } = counts[index];

  let value: string;
  if (minimum.count === maximum.count) {
    if (type === DiagnosticType.Oxygen) {
      value = "1";
    } else {
      value = "0";
    }
  } else if (type === DiagnosticType.Oxygen) {
    value = maximum.value;
  } else {
    value = minimum.value;
  }

  return filterDiagnosticsByBit(diagnostics, value, index);
}

function filterDiagnosticsByBit(
  diagnostics: Diagnostics,
  bit: string,
  index: number,
): Diagnostics {
  return diagnostics.filter((diagnostic) => {
    return diagnostic[index] === bit;
  });
}

function getDiagnosticCounts(diagnostics: Diagnostics) {
  const counts = _(diagnostics)
    .chunk(1)
    .map(([line]) => {
      return line.split("");
    })
    .value();
  const zipped = _.zip(...counts);

  return zipped
    .map((bits) => {
      return (
        _(bits)
          // Random undefined values? No idea where they come from
          .compact()
          .countBy()
          .value()
      );
    })
    .map((count) => {
      const keys = _.keys(count);
      const maximum = _.maxBy(keys, (key) => count[key]);
      const minimum = _.minBy(keys, (key) => count[key]);

      assert(minimum);
      assert(maximum);

      return {
        minimum: {
          value: minimum,
          count: count[minimum],
        },
        maximum: {
          value: maximum,
          count: count[maximum],
        },
      };
    });
}
