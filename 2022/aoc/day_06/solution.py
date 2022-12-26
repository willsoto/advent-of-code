from pathlib import Path

from aoc.utils import Sample


def find_marker(distinct_characters: int) -> int:
    sample = Sample(Path(__file__))

    buffer: int = 0
    characters = sample.characters()
    for index, _ in enumerate(characters):
        buffer = index + distinct_characters

        distinct = set(characters[index:buffer])
        raw = characters[index:buffer]

        if len(distinct) == len(raw):
            break

    return buffer


def part_1() -> int:
    return find_marker(4)


def part_2() -> int:
    return find_marker(14)
