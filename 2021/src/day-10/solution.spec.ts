import test from "ava";
import { example1, example2, part1, part2 } from "./solution.js";

test("part 1 example", (t) => {
  const result = example1();

  t.is(result, 26397);
});

test("part 2 example", (t) => {
  const result = example2();

  t.is(result, 288957);
});

test("part 1", (t) => {
  const result = part1();

  t.is(result, 321237);
});

test("part 2", (t) => {
  const result = part2();

  t.is(result, 2360030859);
});
