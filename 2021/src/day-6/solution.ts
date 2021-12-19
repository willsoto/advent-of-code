import _ from "lodash";
import { openInput } from "../utils.js";

type School = Record<number, number>;

export function part1(): number {
  let school: School = getInitialSchoolOfLanternfish();

  const days = 80;
  for (let day = 0; day < days; day++) {
    school = advanceGeneration(school);
  }

  return _(school).values().sum();
}

export function part2(): number {
  let school: School = getInitialSchoolOfLanternfish();

  const days = 256;
  for (let day = 0; day < days; day++) {
    school = advanceGeneration(school);
  }

  return _(school).values().sum();
}

function advanceGeneration(school: School): School {
  const nextGeneration = school[0];

  for (let age = 0; age < 8; age++) {
    school[age] = school[age + 1];
  }

  // The whole next generation would have their timers become 8
  school[8] = nextGeneration;
  school[6] += nextGeneration;

  return school;
}

function getInitialSchoolOfLanternfish(): School {
  const initialTimers = openInput(import.meta.url)
    .split(",")
    .map((timer) => parseInt(timer));

  let school: School = {};
  const ages = _.range(0, 9);

  ages.forEach((age) => {
    school[age] = 0;
  });

  initialTimers.forEach((timer) => {
    school[timer]++;
  });

  return school;
}
