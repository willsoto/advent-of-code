import functools
from pathlib import Path

from aoc.utils import Sample


def get_calorie_totals() -> list[int]:
    sample = Sample(Path(__file__))

    calorie_totals: list[int] = []
    calorie_subtotal: int = 0

    for calorie in sample.lines:
        if calorie != "":
            calorie_subtotal += int(calorie)
        else:
            calorie_totals.append(calorie_subtotal)
            calorie_subtotal = 0

    return calorie_totals


def part_1() -> int:
    calorie_totals = get_calorie_totals()

    return max(calorie_totals)


def part_2() -> int:
    calorie_totals = get_calorie_totals()
    calorie_totals.sort(reverse=True)

    return functools.reduce(lambda a, b: a + b, calorie_totals[0:3])
