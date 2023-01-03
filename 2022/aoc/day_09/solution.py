from dataclasses import dataclass
from enum import StrEnum
from pathlib import Path
from typing import List, MutableSet

import numpy

from aoc.utils import Coordinate, Sample


class Direction(StrEnum):
    L = "L"
    R = "R"
    U = "U"
    D = "D"


@dataclass(kw_only=True)
class Movement:
    direction: Direction
    distance: int


def parse_movements() -> List[Movement]:
    sample = Sample(Path(__file__))

    movements: List[Movement] = []
    for line in sample.lines:
        (direction, distance) = line.split(" ")

        movements.append(
            Movement(direction=Direction(direction), distance=int(distance))
        )

    return movements


movements = parse_movements()


def compute_visited(length: int) -> int:
    knots: List[Coordinate] = []

    for k in range(length):
        knots.append(Coordinate(x=0, y=0))

    visited: MutableSet[Coordinate] = set()
    visited.add(knots[-1])

    for movement in movements:
        for _ in range(int(movement.distance)):
            match movement.direction:
                case "U":
                    knots[0] = Coordinate(x=knots[0][0], y=knots[0][1] + 1)
                case "D":
                    knots[0] = Coordinate(x=knots[0][0], y=knots[0][1] - 1)
                case "R":
                    knots[0] = Coordinate(x=knots[0][0] + 1, y=knots[0][1])
                case "L":
                    knots[0] = Coordinate(x=knots[0][0] - 1, y=knots[0][1])
                case _:
                    raise RuntimeError("Unknown direction %s" % movement.direction)

            for k in range(length - 1):
                difference_x = knots[k][0] - knots[k + 1][0]
                difference_y = knots[k][1] - knots[k + 1][1]

                if abs(difference_x) > 1 or abs(difference_y) > 1:
                    knots[k + 1] = Coordinate(
                        x=knots[k + 1][0] + numpy.sign(difference_x),
                        y=knots[k + 1][1] + numpy.sign(difference_y),
                    )
                visited.add(knots[-1])

    return len(visited)


def part_1() -> int:
    return compute_visited(2)


def part_2() -> int:
    return compute_visited(10)
