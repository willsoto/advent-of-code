from typing import Tuple
from ..utils import open_input


def part_1():
    reader = open_input(__file__).readlines()
    horizontal_position = 0
    depth = 0
    parsed_lines = [parse_line(line) for line in reader]

    for (direction, distance) in parsed_lines:
        if direction == "forward":
            horizontal_position = horizontal_position + distance
        elif direction == "down":
            #  In a sub so down increases the depth
            depth = depth + distance
        elif direction == "up":
            depth = depth - distance

    total = horizontal_position * depth

    assert horizontal_position == 2073
    assert depth == 850
    assert total == 1762050


def part_2():
    reader = open_input(__file__).readlines()
    horizontal_position = 0
    depth = 0
    aim = 0
    parsed_lines = [parse_line(line) for line in reader]

    for (direction, distance) in parsed_lines:
        if direction == "forward":
            horizontal_position = horizontal_position + distance
            depth = depth + aim * distance
        elif direction == "down":
            #  In a sub so down increases the depth
            aim = aim + distance
        elif direction == "up":
            aim = aim - distance

    total = horizontal_position * depth

    assert horizontal_position == 2073
    assert depth == 895269
    assert total == 1855892637


def parse_line(line: str) -> Tuple[str, int]:
    line = line.strip().split(" ")

    direction = line[0]
    distance = int(line[1])

    return (direction, distance)
