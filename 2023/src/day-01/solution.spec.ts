import { describe, expect, test } from "bun:test";
import { part1, part2 } from "./solution.ts";

describe("Day 1", function () {
  test("Part 1", function () {
    expect(part1()).toEqual(55834);
  });

  test("Part 2", function () {
    expect(part2()).toEqual(53221);
  });
});
