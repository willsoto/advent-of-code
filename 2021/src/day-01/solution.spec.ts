import test from "ava";
import { part1, part2 } from "./solution.js";

test("part 1", (t) => {
  const result = part1();

  t.is(result, 1228);
});

test("part 2", (t) => {
  const result = part2();

  t.is(result, 1257);
});
