from pathlib import Path
from typing import List

from aoc.utils import Sample


def part_1() -> int:
    sample = Sample(Path(__file__))
    cycles_to_check = [20, 60, 100, 140, 180, 220]

    sum: int = 0
    register_value: int = 1
    cycles: int = 0
    for line in sample.lines:
        if line == "noop":
            cycles += 1
            continue

        (op, signal) = line.split()
        assert op == "addx"

        for _ in range(2):
            cycles += 1
            if cycles in cycles_to_check:
                sum += cycles * register_value

        register_value += int(signal)

    return sum


CRTImage = List[List[str]]


def process_sprite(cycles: int, register_value: int, crt_image: CRTImage):
    middle_of_sprite = cycles % 40

    if not middle_of_sprite:
        crt_image.append([])
    if middle_of_sprite - 1 <= register_value <= middle_of_sprite + 1:
        crt_image[-1].append("#")
    else:
        crt_image[-1].append(".")


def part_2() -> List[str]:
    sample = Sample(Path(__file__))

    register_value: int = 1
    cycles: int = 0

    crt_image: CRTImage = []

    for line in sample.lines:
        if line == "noop":
            process_sprite(cycles, register_value, crt_image)
            cycles += 1
            continue

        (op, signal) = line.split()
        assert op == "addx"

        for _ in range(2):
            process_sprite(cycles, register_value, crt_image)
            cycles += 1

        register_value += int(signal)

    return ["".join(row) for row in crt_image]
