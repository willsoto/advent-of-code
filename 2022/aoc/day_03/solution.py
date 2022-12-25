import string
from pathlib import Path
from typing import Dict

from aoc.utils import Sample

all_letters = [*string.ascii_lowercase, *string.ascii_uppercase]

letter_priorities: Dict[str, int] = {}
for index, letter in enumerate(all_letters):
    letter_priorities[letter] = index + 1


def part_1() -> int:
    sample = Sample(Path(__file__).with_name("sample.txt"))

    total: int = 0
    for line in sample.lines:
        letters = [*line]
        half_length = len(letters) // 2
        first_half, second_half = letters[:half_length], letters[half_length:]

        for letter in first_half:
            if letter in second_half:
                priority = letter_priorities[letter]
                total = total + priority
                # Gotta stop cause there are duplicates of the letter
                # but we don't count duplicates
                break

    return total


def part_2() -> int:
    sample = Sample(Path(__file__).with_name("sample.txt"))

    total: int = 0
    for line_group in sample.partition(3):
        first, second, third = line_group

        for letter in first:
            if letter in second:
                if letter in third:
                    priority = letter_priorities[letter]
                    total += priority
                    break

    return total
